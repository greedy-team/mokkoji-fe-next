// middleware.ts
import { auth as middleware } from '@/auth';
import { NextResponse } from 'next/server';
import { publicRoutes } from '../route';

export default middleware(async (req) => {
  const { nextUrl, auth } = req;
  const session = auth as { user?: unknown; error?: string } | null;
  const hasSessionError = session?.error === 'RefreshTokenExpired';
  const isLoggedIn = !!session?.user && !hasSessionError;
  const userAgent = req.headers.get('user-agent') || '';
  const isMobile =
    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  const isPublicRoute = publicRoutes.some((route) => {
    if (route.endsWith('/:path*')) {
      const base = route.replace('/:path*', '');
      return nextUrl.pathname.startsWith(base);
    }
    return route === nextUrl.pathname;
  });

  let response: NextResponse;

  //   /**
  //    * 1) 로그인했을 때 다시 가면 안되는 페이지 (login, signup 등)
  //    */
  //   if (isAuthRoute) {
  //     if (isLoggedIn) {
  //       return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  //     }
  //     return NextResponse.next();
  //   }

  // 리프레시 토큰 만료 시 세션 쿠키 삭제 (자동 로그아웃)
  if (hasSessionError) {
    response = isPublicRoute
      ? NextResponse.next()
      : NextResponse.redirect(new URL('/', nextUrl));

    response.cookies.delete('authjs.session-token');
    response.cookies.delete('__Secure-authjs.session-token');
  } else if (!isLoggedIn && !isPublicRoute) {
    response = NextResponse.redirect(new URL('/', nextUrl));
  } else {
    response = NextResponse.next();
  }

  const currentDeviceCookie = req.cookies.get('x-device-type')?.value;
  const targetDevice = isMobile ? 'mobile' : 'desktop';

  if (currentDeviceCookie !== targetDevice) {
    response.cookies.set('x-device-type', targetDevice, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'lax',
    });
  }

  return response;
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico|.*\\.svg$|.*\\.png$|.*\\.gif$|sitemap\\.xml|robots\\.txt|ads\\.txt).*)',
  ],
};
