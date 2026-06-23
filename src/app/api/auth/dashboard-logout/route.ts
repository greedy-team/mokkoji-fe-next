/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import { DASHBOARD_SESSION_COOKIE_NAME } from '@/shared/lib/dashboard-session';

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(DASHBOARD_SESSION_COOKIE_NAME);
  return response;
}
