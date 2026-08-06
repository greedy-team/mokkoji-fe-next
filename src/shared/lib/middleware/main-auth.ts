import { NextRequest, NextResponse } from 'next/server';
import {
  DEFAULT_UNIVERSITY_CODE,
  extractUniversityCode,
  isPublicPath,
} from './university-url';
import {
  applySessionCookie,
  applySetCookie,
  clearSessionCookie,
  resolveSession,
  type SessionState,
} from './session';

/**
 * 메인 서비스(학교별 경로)의 인증 처리.
 * 세션 상태와 공개 경로 여부를 조합해 통과시킬지 로그인으로 보낼지 결정한다.
 */

const DEVICE_TYPE_COOKIE_NAME = 'x-device-type';
const MOBILE_USER_AGENT =
  /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

function decideResponse(
  req: NextRequest,
  { session, isExpired, isUpdated }: SessionState,
): NextResponse {
  const { nextUrl } = req;
  const isPublic = isPublicPath(nextUrl.pathname);
  const loginUrl = `/${extractUniversityCode(nextUrl.pathname)}/login`;

  // accessToken 만료 + refreshToken 없음 → 세션 쿠키 삭제, 비공개 경로면 로그인으로
  if (session && isExpired && !session.refreshToken && !isUpdated) {
    const response = isPublic
      ? NextResponse.next()
      : NextResponse.redirect(new URL(loginUrl, nextUrl));
    clearSessionCookie(response);
    return response;
  }

  // 비로그인 상태에서 비공개 경로 접근 → 로그인으로
  if (!session?.accessToken && !isPublic) {
    return NextResponse.redirect(new URL(loginUrl, nextUrl));
  }

  return NextResponse.next();
}

/**
 * User-Agent로 판별한 디바이스 타입을 쿠키에 담는다.
 * 서버 컴포넌트가 이 값을 읽어 반응형 초기 렌더링을 결정한다.
 */
function applyDeviceTypeCookie(req: NextRequest, response: NextResponse): void {
  const isMobile = MOBILE_USER_AGENT.test(req.headers.get('user-agent') || '');
  const targetDevice = isMobile ? 'mobile' : 'desktop';

  if (req.cookies.get(DEVICE_TYPE_COOKIE_NAME)?.value === targetDevice) return;

  response.cookies.set(DEVICE_TYPE_COOKIE_NAME, targetDevice, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7일
    sameSite: 'lax',
  });
}

export default async function handleMainAuth(
  req: NextRequest,
): Promise<NextResponse> {
  const sessionState = await resolveSession(req);

  if (req.nextUrl.pathname === '/') {
    return NextResponse.redirect(
      new URL(`/${DEFAULT_UNIVERSITY_CODE}`, req.nextUrl),
    );
  }

  const response = decideResponse(req, sessionState);

  applySessionCookie(response, sessionState);
  applyDeviceTypeCookie(req, response);
  applySetCookie(req, response);

  return response;
}
