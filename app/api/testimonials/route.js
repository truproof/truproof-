import { NextResponse } from 'next/server';
import pool from '../../../lib/db';

export const dynamic = 'force-dynamic';

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
      // Default widget behavior: serve only approved reviews
      queryText += ' AND "status" = $2';
      queryParams.push('approved');
    }

    queryText += ' ORDER BY "createdAt" DESC';

    const client = await pool.connect();
    const result = await client.query(queryText, queryParams);
    client.release();

    const response = NextResponse.json({ success: true, testimonials: result.rows });

    // Edge caching: 60 sec cache on CDN, background revalidate for 300 sec
    if (!status || status === 'approved') {
      response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    }

    return response;
  } catch (error) {
    console.error('FETCH TESTIMONIALS ERROR:', error);
    return NextResponse.json({ success: false, error: 'Database fetch failed' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { token, rating, reviewText, clientName, clientEmail, company, avatarUrl } = body;

    if (!rating || !reviewText || !clientName) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const client = await pool.connect();

    // Verify token validity
    const reqRes = await client.query(
      'SELECT "businessId" FROM "Request" WHERE "token" = $1 AND "isUsed" = false AND "expiresAt" > NOW()',
      [token]
    );

    const businessId = reqRes.rows[0]?.businessId || 'default-biz';

    // Insert review
    const insertRes = await client.query(
      `INSERT INTO "Testimonial" ("businessId", "clientName", "clientEmail", "company", "avatarUrl", "rating", "reviewText", "status")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [businessId, clientName, clientEmail, company || '', avatarUrl || '', rating, reviewText, 'approved']
    );

    // Mark token used
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
