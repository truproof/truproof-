import { NextResponse } from 'next/server';
import pool from '../../../lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  let client;
  try {
    const payload = await request.json();
    const event = payload.event || payload.type;

    client = await pool.connect();

    // 1. Log payment event
    await client.query(`
      INSERT INTO "WebhookEvent" ("gateway", "eventType", "payload")
      VALUES ($1, $2, $3)
    `, [payload.gateway || 'payment_gateway', event, JSON.stringify(payload)]);

    // 2. Identify Business and Plan metadata
    const businessId = payload.businessId || payload.data?.object?.metadata?.businessId;
    const plan = payload.plan || payload.data?.object?.metadata?.plan || 'pro';
    const isTopup = payload.isTopup || payload.data?.object?.metadata?.isTopup;

    if (businessId) {
      if (isTopup) {
        // AI 20 Pack Top-up (+20 Credits)
        await client.query(`
          UPDATE "Business"
          SET "aiCredits" = "aiCredits" + 20
          WHERE "id" = $1
        `, [businessId]);
      } else {
        // Plan Upgrade
        const aiCreditsMap = { starter: 3, pro: 20, agency: 100 };
        const credits = aiCreditsMap[plan] || 0;

        await client.query(`
          UPDATE "Business"
          SET "plan" = $1,
              "aiCredits" = "aiCredits" + $2,
              "subscriptionStatus" = 'active',
              "updatedAt" = NOW()
          WHERE "id" = $3
        `, [plan, credits, businessId]);
      }
    }

    return NextResponse.json({ success: true, message: 'Webhook processed' });
  } catch (err) {
    console.error('WEBHOOK ERROR:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  } finally {
    if (client) client.release();
  }
}
