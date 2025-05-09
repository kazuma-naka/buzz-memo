import { NextResponse } from 'next/server';
import { isBookmarkSaved } from '@/actions/bookmarks';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(request: Request) {
  let payload: { userId?: string; title?: string };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON' },
      { status: 400, headers: corsHeaders },
    );
  }

  const { userId, title } = payload;
  if (!userId || !title) {
    return NextResponse.json(
      { error: 'Missing userId or title' },
      { status: 400, headers: corsHeaders },
    );
  }

  try {
    const saved = await isBookmarkSaved({ userId, title });
    return NextResponse.json({ saved }, { status: 200, headers: corsHeaders });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500, headers: corsHeaders },
    );
  }
}
