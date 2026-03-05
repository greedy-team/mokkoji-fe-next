/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import { getSession } from '@/shared/lib/cookie-session';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(null);
  }

  return NextResponse.json({
    user: session.user,
    role: session.role,
    accessToken: session.accessToken,
  });
}
