import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import crypto from 'crypto';

// 1. GET: Fetch all active invite links for dashboard
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const businessId = searchParams.get('businessId') || 'default-biz';

    const result = await query(
      `SELECT * FROM "Request" WHERE "businessId" = $1 ORDER BY "createdAt" DESC`,
      [businessId]
    );

    return NextResponse.json({ success: true, requests: result.rows });
  } catch (error) {
    console.error('Fetch requests error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch requests' }, { status: 500 });
  }
}

// 2. POST: Create a single-use 7-day expiring invite link
export async function POST(request) {
  try {
    const body = await request.json();
    const { businessId, clientName, clientEmail, clientPhone } = body;

    const targetBusinessId = businessId || 'default-biz';
    const requestId = 'req_' + Date.now();
    const token = crypto.randomBytes(16).toString('hex');

    // 7 Days expiration
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Save into Neon DB
    const result = await query(
      `INSERT INTO "Request" 
       ("id", "token", "businessId", "clientName", "clientEmail", "clientPhone", "status", "expiresAt") 
       VALUES ($1, $2, $3, $4, $5, $6, 'pending', $7) 
       RETURNING *`,
      [requestId, token, targetBusinessId, clientName || null, clientEmail || null, clientPhone || null, expiresAt]
    );

    const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://truproof.vercel.app'}/request/${token}`;

    return NextResponse.json({ 
      success: true, 
      request: result.rows[0],
      inviteUrl 
    });
  } catch (error) {
    console.error('Create request error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create invite token' }, { status: 500 });
  }
}
