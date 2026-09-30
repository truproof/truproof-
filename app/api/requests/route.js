import { NextResponse } from 'next/server';
import crypto from 'crypto';
import pool from '../../../lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  let client;
  try {
    const body = await request.json().catch(() => ({}));
    const businessId = body.businessId || 'default-biz';
    const clientName = body.clientName || 'Valued Client';
    const clientEmail = body.clientEmail || '';

    // 1. Generate unique 32-char token
    const token = crypto.randomBytes(16).toString('hex');

    // 2. 7-Day Expiration calculation
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    client = await pool.connect();

    // 3. Ensure business exists
    await client.query(`
      INSERT INTO "Business" ("id", "name", "email", "plan")
      VALUES ($1, 'TruProof Business', 'admin@truproof.app', 'free')
      ON CONFLICT ("id") DO NOTHING;
    `, [businessId]);

    // 4. Insert request token into DB
    await client.query(`
      INSERT INTO "Request" ("token", "businessId", "clientName", "clientEmail", "status", "expiresAt")
      VALUES ($1, $2, $3, $4, 'pending', $5)
    `, [token, businessId, clientName, clientEmail, expiresAt]);

    // 5. Construct invite URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://truproof.vercel.app';
    const inviteUrl = `${baseUrl}/request/${token}`;

    return NextResponse.json({
      success: true,
      token,
      inviteUrl
    });
  } catch (error) {
    console.error('GENERATE LINK ERROR:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to generate link'
    }, { status: 500 });
  } finally {
    if (client) client.release();
  }
}
