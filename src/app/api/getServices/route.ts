import { NextResponse } from 'next/server';
import { getServicesByUserEmail } from '@/actions/services';

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
    const services = await getServicesByUserEmail(email);
    return NextResponse.json({ services }, { headers: corsHeaders });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500, headers: corsHeaders },
    );
  }
}
