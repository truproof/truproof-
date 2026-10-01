import { NextResponse } from 'next/server';
import crypto from 'crypto';
import pool from '../../../lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  let client;
  try {
    const body = await request.json().catch(() => ({}));
    const { businessId = 'default-biz', clientName = '', clientEmail = '' } = body;

    const token = crypto.randomBytes(16).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    client = await pool.connect();

    // Ensure business row exists
    await client.query(`
      INSERT INTO "Business" ("id", "name", "email", "plan")
      VALUES ($1, $2, $3, 'free')
      ON CONFLICT ("id") DO NOTHING;
    `, [businessId, clientName || 'TruProof Founder', clientEmail || 'user@truproof.app']);

    // Insert Request token linked directly to this businessId
    await client.query(`
      INSERT INTO "Request" ("token", "businessId", "clientName", "clientEmail", "expiresAt", "isUsed")
      VALUES ($1, $2, $3, $4, $5, false)
    `, [token, businessId, clientName, clientEmail, expiresAt]);

    const origin = process.env.NEXT_PUBLIC_APP_URL || 'https://truproof.vercel.app';
    const inviteUrl = `${origin}/request/${token}`;

    return NextResponse.json({ success: true, inviteUrl });
  } catch (error) {
    console.error('REQUEST TOKEN ERROR:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  } finally {
    if (client) client.release();
  }
}
