// Contact API disabled intentionally. Returning 410 for any method.
import { NextResponse } from 'next/server';

export async function POST() {
	return NextResponse.json({ error: 'Contact form disabled' }, { status: 410 });
}

export async function GET() {
	return NextResponse.json({ error: 'Contact form disabled' }, { status: 410 });
}
