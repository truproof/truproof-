import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// 1. GET Testimonials (Dashboard aur Widget ke liye)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const businessId = searchParams.get('businessId') || 'default-biz';
    const status = searchParams.get('status') || 'approved';

    let result;
    if (status === 'all') {
      result = await query(
        `SELECT * FROM "Testimonial" WHERE "businessId" = $1 ORDER BY "createdAt" DESC`,
        [businessId]
      );
    } else {
      result = await query(
        `SELECT * FROM "Testimonial" WHERE "businessId" = $1 AND "status" = $2 ORDER BY "createdAt" DESC`,
        [businessId, status]
      );
    }

    return NextResponse.json({ success: true, testimonials: result.rows });
  } catch (error) {
    console.error('Fetch testimonials error:', error);
    return NextResponse.json({ success: false, error: 'Database fetch failed' }, { status: 500 });
  }
}

// 2. POST Testimonial (Real Database me review save karein)
export async function POST(request) {
  try {
    const body = await request.json();
    const { clientName, clientEmail, company, rating, reviewText, videoUrl, businessId } = body;

    if (!clientName || !clientEmail || !reviewText) {
      return NextResponse.json(
        { success: false, error: 'Name, email and review text are required' },
        { status: 400 }
      );
    }

    const targetBusinessId = businessId || 'default-biz';
    const id = 'test_' + Date.now();

    // Default business check/create
    await query(
      `INSERT INTO "Business" ("id", "name", "email") 
       VALUES ($1, 'TruProof Business', 'admin@truproof.com') 
       ON CONFLICT ("id") DO NOTHING`,
      [targetBusinessId]
    );

    // Neon PostgreSQL me save karein
    const result = await query(
      `INSERT INTO "Testimonial" 
       ("id", "businessId", "clientName", "clientEmail", "company", "rating", "reviewText", "videoUrl", "status") 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'approved') 
       RETURNING *`,
      [id, targetBusinessId, clientName, clientEmail, company || '', rating || 5, reviewText, videoUrl || '']
    );

    return NextResponse.json({ success: true, testimonial: result.rows[0] });
  } catch (error) {
    console.error('Save testimonial error:', error);
    return NextResponse.json({ success: false, error: 'Failed to save to database' }, { status: 500 });
  }
}
