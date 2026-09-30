import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const rawBody = await req.text();
    const headers = req.headers;
    
    // Detect Gateway: Stripe vs Razorpay
    const stripeSignature = headers.get('stripe-signature');
    const razorpaySignature = headers.get('x-razorpay-signature');

    let parsedPayload = {};
    try {
      parsedPayload = JSON.parse(rawBody);
    } catch {
      parsedPayload = { raw: rawBody };
    }

    const client = await pool.connect();

    // 1. Ensure webhook_events table exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS "WebhookEvent" (
        "id" SERIAL PRIMARY KEY,
        "gateway" VARCHAR(50) NOT NULL,
        "eventType" VARCHAR(100),
        "payload" JSONB,
        "createdAt" TIMESTAMP DEFAULT NOW()
      );
    `);

    // 2. Identify Event Type
    let gateway = 'unknown';
    let eventType = 'payment.received';
    let businessId = 'default-biz';
    let amount = 0;
    let currency = 'USD';

    if (stripeSignature) {
      gateway = 'stripe';
      eventType = parsedPayload?.type || 'stripe.event';
      if (parsedPayload?.data?.object) {
        amount = (parsedPayload.data.object.amount_total || 0) / 100;
        currency = parsedPayload.data.object.currency || 'usd';
        businessId = parsedPayload.data.object.client_reference_id || 'default-biz';
      }
    } else if (razorpaySignature) {
      gateway = 'razorpay';
      eventType = parsedPayload?.event || 'razorpay.event';
      if (parsedPayload?.payload?.payment?.entity) {
        const p = parsedPayload.payload.payment.entity;
        amount = (p.amount || 0) / 100;
        currency = p.currency || 'INR';
        businessId = p.notes?.businessId || 'default-biz';
      }
    }

    // 3. Log Webhook Event
    await client.query(
      `INSERT INTO "WebhookEvent" ("gateway", "eventType", "payload") VALUES ($1, $2, $3)`,
      [gateway, eventType, parsedPayload]
    );

    // 4. Update Business Plan upon successful payment
    if (
      eventType === 'checkout.session.completed' ||
      eventType === 'payment.captured' ||
      eventType === 'order.paid'
    ) {
      await client.query(
        `UPDATE "Business" 
         SET "plan" = 'pro', "updatedAt" = NOW() 
         WHERE "id" = $1`,
        [businessId]
      );
    }

    client.release();

    return NextResponse.json({ success: true, message: 'Webhook processed successfully' });
  } catch (err) {
    console.error('PAYMENT WEBHOOK ERROR:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
