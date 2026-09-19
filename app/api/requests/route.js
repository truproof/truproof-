import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const token = Math.random().toString(36).substring(2, 10);
    const host = req.headers.get('host');
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const link = `${protocol}://${host}/request/${token}`;

    return NextResponse.json({ success: true, token, link });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
