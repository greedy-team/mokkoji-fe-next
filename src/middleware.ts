import { NextRequest, NextResponse } from 'next/server';
import { publicRoutes } from '../route';

const SESSION_COOKIE_NAME = 'app-session';

export default function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const sessionCookie = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const isLoggedIn = !!sessionCookie;
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

  if (!isLoggedIn && !isPublicRoute) {
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
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico|.*\\.svg$|.*\\.png$|.*\\.gif$|sitemap\\.xml|robots\\.txt|ads\\.txt).*)',
  ],
};
