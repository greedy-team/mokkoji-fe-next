// middleware.ts
import { auth as middleware } from '@/auth';
import { NextResponse } from 'next/server';
import { publicRoutes } from '../route';

export default middleware(async (req) => {
  const { nextUrl, auth } = req;

  const isLoggedIn = !!auth?.user;

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  //   /**
  //    * 1) 로그인했을 때 다시 가면 안되는 페이지 (login, signup 등)
  //    */
  //   if (isAuthRoute) {
  //     if (isLoggedIn) {
  //       return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  //     }
  //     return NextResponse.next();
  //   }

  /**
   * 2) 로그인하지 않았을 때 접근 불가
   */
  if (!isLoggedIn && !isPublicRoute) {
    // 원래 가려던 경로로 돌아오게 하려면 callback 추가:
    // const callback = encodeURIComponent(nextUrl.pathname + nextUrl.search);
    // return NextResponse.redirect(new URL(`/login?callbackUrl=${callback}`, nextUrl));
    return NextResponse.redirect(new URL('/', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico|.*\\.svg$).*)',
  ],
};
