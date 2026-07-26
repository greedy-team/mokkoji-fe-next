/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';
import { DASHBOARD_SESSION_COOKIE_NAME } from '@/shared/lib/dashboard-session';

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(DASHBOARD_SESSION_COOKIE_NAME);
  return response;
}

export async function GET(req: NextRequest) {
  const response = NextResponse.redirect(new URL('/dashboard/login', req.url));
  response.cookies.delete(DASHBOARD_SESSION_COOKIE_NAME);
  return response;
}
