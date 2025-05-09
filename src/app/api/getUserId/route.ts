import { NextResponse } from 'next/server';
import { getUserIdByEmail } from '@/actions/users';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return NextResponse.json(null, { status: 204, headers: corsHeaders });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  if (!email) {
    return NextResponse.json(
      { error: 'Missing email' },
      { status: 400, headers: corsHeaders },
    );
  }

  try {
    const id = await getUserIdByEmail(email);
    return NextResponse.json({ id }, { headers: corsHeaders });
  } catch (err: any) {
    const message = err.message || 'Unknown error';
    const status = message.includes('not found') ? 404 : 500;
    return NextResponse.json(
      { error: message },
      { status, headers: corsHeaders },
    );
  }
}
