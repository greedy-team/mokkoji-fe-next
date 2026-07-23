import { cookies } from 'next/headers';

export const DASHBOARD_SESSION_COOKIE_NAME = 'dashboard-session';

export const DASHBOARD_SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 8, // 8시간
};

export interface DashboardSession {
  accessToken: string;
}

export function parseDashboardSessionCookie(
  raw: string | undefined,
): DashboardSession | null {
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw)) as DashboardSession;
  } catch {
    return null;
  }
}

export async function getDashboardSession(): Promise<DashboardSession | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(DASHBOARD_SESSION_COOKIE_NAME)?.value;
  return parseDashboardSessionCookie(raw);
}

export function buildDashboardSessionCookie(session: DashboardSession) {
  return {
    name: DASHBOARD_SESSION_COOKIE_NAME,
    value: encodeURIComponent(JSON.stringify(session)),
    ...DASHBOARD_SESSION_COOKIE_OPTIONS,
  };
}
