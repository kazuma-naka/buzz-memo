import { NextResponse } from 'next/server';
import { insertBookmark } from '@/actions/bookmarks';
import { BookmarkPayload } from '@/types/bookmarkPayload';

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
  let payload: BookmarkPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON' },
      { status: 400, headers: corsHeaders },
    );
  }

  try {
    const inserted = await insertBookmark(payload);
    return NextResponse.json(
      { success: true, inserted },
      { status: 200, headers: corsHeaders },
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500, headers: corsHeaders },
    );
  }
}
