import { NextResponse } from 'next/server';
import { z } from 'zod';
import pool from '../../../lib/db';

export const dynamic = 'force-dynamic';

// Zod Schema allowing optional videoUrl
const testimonialSchema = z.object({
  token: z.string().optional().default(''),
  rating: z.number().int().min(1).max(5),
  reviewText: z.string().min(3, 'Review must be at least 3 characters').max(2000),
  clientName: z.string().min(1, 'Name is required').max(100),
  clientEmail: z.string().email('Invalid email address'),
  company: z.string().max(100).optional().default(''),
  videoUrl: z.string().optional().default(''),
  avatarUrl: z.string().optional().default('')
});

function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<[^>]*>?/gm, '')
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
      queryText += ' AND "status" = $2';
      queryParams.push('approved');
    }

    queryText += ' ORDER BY "createdAt" DESC';

    const client = await pool.connect();
    const result = await client.query(queryText, queryParams);
    client.release();

    const response = NextResponse.json({ success: true, testimonials: result.rows });

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
    
    const parsedData = testimonialSchema.safeParse(body);
    if (!parsedData.success) {
      const errorMsg = parsedData.error.errors.map(e => e.message).join(', ');
      return NextResponse.json({ success: false, error: errorMsg }, { status: 400 });
    }

    const { token, rating, reviewText, clientName, clientEmail, company, videoUrl, avatarUrl } = parsedData.data;

    const cleanReviewText = sanitizeInput(reviewText);
    const cleanName = sanitizeInput(clientName);
    const cleanCompany = sanitizeInput(company);
    const cleanVideoUrl = sanitizeInput(videoUrl);

    const client = await pool.connect();

    // Check token if present
    let businessId = 'default-biz';
    if (token) {
      const reqRes = await client.query(
        'SELECT "businessId" FROM "Request" WHERE "token" = $1 AND "isUsed" = false AND "expiresAt" > NOW()',
        [token]
      );
      if (reqRes.rows.length > 0) {
        businessId = reqRes.rows[0].businessId;
      }
    }

    // Insert sanitized review with videoUrl
    const insertRes = await client.query(
      `INSERT INTO "Testimonial" ("businessId", "clientName", "clientEmail", "company", "avatarUrl", "rating", "reviewText", "videoUrl", "status")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [businessId, cleanName, clientEmail, cleanCompany, avatarUrl || '', rating, cleanReviewText, cleanVideoUrl, 'approved']
    );

    // Mark token used
    if (token) {
      await client.query('UPDATE "Request" SET "isUsed" = true WHERE "token" = $1', [token]);
    }

    client.release();
    return NextResponse.json({ success: true, testimonial: insertRes.rows[0] });
  } catch (error) {
    console.error('SUBMISSION ERROR:', error);
    return NextResponse.json({ success: false, error: 'Database submission failed' }, { status: 500 });
  }
}
