import { NextRequest, NextResponse } from 'next/server';
import {
  DASHBOARD_SESSION_COOKIE_NAME,
  parseDashboardSessionCookie,
} from '@/shared/lib/dashboard-session';

/**
 * 대시보드 전용 인증 처리.
 * 메인 서비스 세션(app-session)과 분리된 별도 쿠키(dashboard-session)로 관리하며,
 * 학교 코드 체계를 쓰지 않으므로 메인 흐름과 완전히 분리한다.
 *
 * @returns 대시보드 경로가 아니면 null — 호출부가 메인 흐름으로 넘긴다
 */
export default function handleDashboardAuth(
  req: NextRequest,
): NextResponse | null {
  const { pathname } = req.nextUrl;

  if (pathname !== '/dashboard' && !pathname.startsWith('/dashboard/'))
    return null;

  const raw = req.cookies.get(DASHBOARD_SESSION_COOKIE_NAME)?.value;
  const isAuthenticated = !!parseDashboardSessionCookie(raw)?.accessToken;

  if (pathname === '/dashboard/login') {
    return isAuthenticated
      ? NextResponse.redirect(new URL('/dashboard', req.nextUrl))
      : NextResponse.next();
  }

  return isAuthenticated
    ? NextResponse.next()
    : NextResponse.redirect(new URL('/dashboard/login', req.nextUrl));
}
