import { NextResponse } from 'next/server';

// Contact API disabled intentionally.
export async function GET() {
  return NextResponse.json({ error: 'Contact form disabled' }, { status: 410 });
}

export async function POST() {
  return NextResponse.json({ error: 'Contact form disabled' }, { status: 410 });
}
