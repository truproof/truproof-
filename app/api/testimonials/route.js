import { NextResponse } from 'next/server';
import { z } from 'zod';
import pool from '../../../lib/db';

export const dynamic = 'force-dynamic';

// 1. Strict Zod Schema validation
const testimonialSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  rating: z.number().int().min(1).max(5),
  reviewText: z.string().min(5, 'Review must be at least 5 characters').max(2000),
  clientName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  clientEmail: z.string().email('Invalid email address'),
  company: z.string().max(100).optional().default(''),
  avatarUrl: z.string().url().optional().or(z.literal(''))
});

// Helper: Basic HTML/XSS Sanitizer (Strip harmful tags)
function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<[^>]*>?/gm, '') // Remove HTML tags
    .replace(/[<>'"&]/g, (char) => {
      switch (char) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case "'": return '&#39;';
        case '"': return '&quot;';
        case '&': return '&amp;';
        default: return char;
      }
    })
    .trim();
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const businessId = searchParams.get('businessId') || 'default-biz';
    const status = searchParams.get('status');

    let queryText = 'SELECT * FROM "Testimonial" WHERE "businessId" = $1';
    let queryParams = [businessId];

    if (status && status !== 'all') {
      queryText += ' AND "status" = $2';
      queryParams.push(status);
    } else if (!status) {
      // Default: serve only approved reviews to widgets
      queryText += ' AND "status" = $2';
      queryParams.push('approved');
    }

    queryText += ' ORDER BY "createdAt" DESC';

    const client = await pool.connect();
    const result = await client.query(queryText, queryParams);
    client.release();

    const response = NextResponse.json({ success: true, testimonials: result.rows });

    // Edge caching on CDN
    if (!status || status === 'approved') {
      response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    }

    return response;
  } catch (error) {
    console.error('FETCH ERROR:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    
    // Zod parsing & validation
    const parsedData = testimonialSchema.safeParse(body);
    if (!parsedData.success) {
      const errorMsg = parsedData.error.errors.map(e => e.message).join(', ');
      return NextResponse.json({ success: false, error: errorMsg }, { status: 400 });
    }

    const { token, rating, reviewText, clientName, clientEmail, company, avatarUrl } = parsedData.data;

    // Sanitize text inputs against XSS attacks
    const cleanReviewText = sanitizeInput(reviewText);
    const cleanName = sanitizeInput(clientName);
    const cleanCompany = sanitizeInput(company);

    const client = await pool.connect();

    // Verify token validity
    const reqRes = await client.query(
      'SELECT "businessId" FROM "Request" WHERE "token" = $1 AND "isUsed" = false AND "expiresAt" > NOW()',
      [token]
    );

    const businessId = reqRes.rows[0]?.businessId || 'default-biz';

    // Insert sanitized review
    const insertRes = await client.query(
      `INSERT INTO "Testimonial" ("businessId", "clientName", "clientEmail", "company", "avatarUrl", "rating", "reviewText", "status")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [businessId, cleanName, clientEmail, cleanCompany, avatarUrl || '', rating, cleanReviewText, 'approved']
    );

    // Invalidate used token
    if (token && reqRes.rows.length > 0) {
      await client.query('UPDATE "Request" SET "isUsed" = true WHERE "token" = $1', [token]);
    }

    client.release();
    return NextResponse.json({ success: true, testimonial: insertRes.rows[0] });
  } catch (error) {
    console.error('SUBMISSION ERROR:', error);
    return NextResponse.json({ success: false, error: 'Submission failed' }, { status: 500 });
  }
}
