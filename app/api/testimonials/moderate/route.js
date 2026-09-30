import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  let client;
  try {
    const { id, action } = await request.json();
    if (!id || !['approve', 'reject'].includes(action)) {
      return NextResponse.json({ success: false, error: 'Invalid parameters' }, { status: 400 });
    }

    client = await pool.connect();

    // 1. Fetch business details & current plan
    const reviewRes = await client.query('SELECT "businessId" FROM "Testimonial" WHERE "id" = $1', [id]);
    if (reviewRes.rows.length === 0) {
      return NextResponse.json({ success: false, error: 'Review not found' }, { status: 404 });
    }
    const businessId = reviewRes.rows[0].businessId;

    if (action === 'approve') {
      const bizRes = await client.query('SELECT "plan" FROM "Business" WHERE "id" = $1', [businessId]);
      const plan = bizRes.rows[0]?.plan || 'free';

      // 2. Strict Server-Side Check: Free max 3, Starter max 15
      const countRes = await client.query(
        'SELECT COUNT(*) FROM "Testimonial" WHERE "businessId" = $1 AND "status" = \'approved\'',
        [businessId]
      );
      const approvedCount = parseInt(countRes.rows[0].count, 10);

      if (plan === 'free' && approvedCount >= 3) {
        return NextResponse.json({ 
          success: false, 
          error: 'Free Plan limit reached (Max 3 Approved Reviews). Upgrade to Pro.' 
        }, { status: 403 });
      }

      if (plan === 'starter' && approvedCount >= 15) {
        return NextResponse.json({ 
          success: false, 
          error: 'Starter Plan limit reached (Max 15 Approved Reviews). Upgrade to Pro.' 
        }, { status: 403 });
      }
    }

    // 3. Update status
    await client.query(
      'UPDATE "Testimonial" SET "status" = $1 WHERE "id" = $2',
      [action === 'approve' ? 'approved' : 'rejected', id]
    );

    return NextResponse.json({ success: true, status: action === 'approve' ? 'approved' : 'rejected' });
  } catch (err) {
    console.error('MODERATION ERROR:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  } finally {
    if (client) client.release();
  }
}
