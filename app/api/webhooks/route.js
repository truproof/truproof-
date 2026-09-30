import { NextResponse } from 'next/server';
import crypto from 'crypto';
import pool from '../../../lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  let client;
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-razorpay-signature');
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // Verify HMAC SHA256 if secret is set
    if (secret && signature) {
      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(rawBody)
        .digest('hex');

      if (expectedSignature !== signature) {
        return NextResponse.json({ success: false, error: 'Invalid webhook signature' }, { status: 400 });
      }
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event || payload.type;
    const notes = payload.payload?.payment?.entity?.notes || payload.data?.object?.metadata || {};
    const businessId = notes.businessId || 'default-biz';
    const plan = notes.plan || 'pro';
    const isTopup = notes.isTopup === 'true' || notes.isTopup === true;

    client = await pool.connect();

    // Idempotency: Duplicate event check
    const eventId = payload.payload?.payment?.entity?.id || payload.id;
    if (eventId) {
      const existing = await client.query('SELECT "id" FROM "WebhookEvent" WHERE "eventType" = $1', [eventId]);
      if (existing.rows.length > 0) {
        return NextResponse.json({ success: true, message: 'Event already processed' });
      }
    }

    // Log Event
    await client.query(
      'INSERT INTO "WebhookEvent" ("gateway", "eventType", "payload") VALUES ($1, $2, $3)',
      ['razorpay_or_stripe', eventId || event, payload]
    );

    if (isTopup) {
      await client.query('UPDATE "Business" SET "aiCredits" = "aiCredits" + 20 WHERE "id" = $1', [businessId]);
    } else {
      const credits = plan === 'agency' ? 100 : plan === 'pro' ? 20 : 3;
      await client.query(
        'UPDATE "Business" SET "plan" = $1, "aiCredits" = "aiCredits" + $2, "subscriptionStatus" = \'active\' WHERE "id" = $3',
        [plan, credits, businessId]
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('WEBHOOK ERROR:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  } finally {
    if (client) client.release();
  }
}
