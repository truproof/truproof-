import { NextResponse } from 'next/server';
import { z } from 'zod';
import pool from '../../../lib/db';

export const dynamic = 'force-dynamic';

const testimonialSchema = z.object({
  token: z.string().optional().default(''),
  businessId: z.string().optional().default(''),
  rating: z.number().int().min(1).max(5),
  reviewText: z.string().min(2, 'Review too short').max(3000),
  clientName: z.string().min(1, 'Name is required').max(100),
  clientEmail: z.string().email('Invalid email address'),
  company: z.string().max(100).optional().default(''),
  videoUrl: z.string().optional().default(''),
  avatarUrl: z.string().optional().default('')
});

function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>?/gm, '').trim();
}

export async function GET(request) {
  let client;
  try {
    const { searchParams } = new URL(request.url);
    const businessId = searchParams.get('businessId') || 'default-biz';
    const status = searchParams.get('status');

    let queryText = 'SELECT * FROM "Testimonial" WHERE "businessId" = $1';
    let queryParams = [businessId];

    if (status && status !== 'all') {
      queryText += ' AND "status" = $2';
      queryParams.push(status);
    }

    queryText += ' ORDER BY "createdAt" DESC';

    client = await pool.connect();
    const result = await client.query(queryText, queryParams);

    return NextResponse.json({ success: true, testimonials: result.rows });
  } catch (error) {
    console.error('FETCH ERROR:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  } finally {
    if (client) client.release();
  }
}

export async function POST(request) {
  let client;
  try {
    const body = await request.json().catch(() => ({}));
    const parsed = testimonialSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ 
        success: false, 
        error: parsed.error.errors.map(e => e.message).join(', ') 
      }, { status: 400 });
    }

    const { token, businessId: bodyBizId, rating, reviewText, clientName, clientEmail, company, videoUrl, avatarUrl } = parsed.data;

    client = await pool.connect();

    // 1. Resolve businessId from token or payload
    let targetBusinessId = bodyBizId || 'default-biz';
    if (token) {
      const reqRes = await client.query(
        'SELECT "businessId" FROM "Request" WHERE "token" = $1',
        [token]
      );
      if (reqRes.rows.length > 0 && reqRes.rows[0].businessId) {
        targetBusinessId = reqRes.rows[0].businessId;
      }
    }

    // 2. Ensure Business row exists for this businessId to avoid foreign key failure
    await client.query(`
      INSERT INTO "Business" ("id", "name", "email", "plan")
      VALUES ($1, $2, $3, 'free')
      ON CONFLICT ("id") DO NOTHING;
    `, [targetBusinessId, 'TruProof User', 'user@truproof.app']);

    // 3. Insert Testimonial with 'pending' status so it shows up in moderation queue
    const insertRes = await client.query(
      `INSERT INTO "Testimonial" 
       ("businessId", "clientName", "clientEmail", "company", "avatarUrl", "rating", "reviewText", "videoUrl", "status")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        targetBusinessId,
        sanitize(clientName),
        sanitize(clientEmail),
        sanitize(company),
        sanitize(avatarUrl),
        rating,
        sanitize(reviewText),
        sanitize(videoUrl),
        'pending'
      ]
    );

    // 4. Mark token used if applicable
    if (token) {
      await client.query('UPDATE "Request" SET "isUsed" = true WHERE "token" = $1', [token]);
    }

    return NextResponse.json({ success: true, testimonial: insertRes.rows[0] });
  } catch (error) {
    console.error('SUBMIT DATABASE ERROR:', error);
    return NextResponse.json({ 
      success: false, 
      error: `Database: ${error.message}` 
    }, { status: 500 });
  } finally {
    if (client) client.release();
  }
}
