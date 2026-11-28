/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';
import serverApi from '@/shared/api/server-api';
import { LoginSuccessResponse } from '@/features/login/model/type';
import {
  LEGACY_SESSION_COOKIE_NAME,
  relaySetCookies,
} from '@/shared/lib/auth-cookie';
import { toApiCode } from '@/shared/lib/urlCodeConverter';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  const state = searchParams.get('state') ?? 'sejong';

  if (!code) {
    return NextResponse.redirect(new URL(`/${state}/login`, request.url));
  }

  try {
    const loginResponse = await serverApi.post('users/auth/kakao', {
      json: { code, universityCode: toApiCode(state) },
      headers: { Origin: process.env.NEXT_PUBLIC_BASE_URL },
    });

    const loginResponseBody: LoginSuccessResponse = await loginResponse.json();

    if (!loginResponseBody.data) {
      return NextResponse.redirect(new URL(`/${state}/login`, request.url));
    }

    const redirectUrl = loginResponseBody.data.isNewUser
      ? `/${state}/my?newUser=true`
      : `/${state}/my`;
    const response = NextResponse.redirect(new URL(redirectUrl, request.url));
    // delete 는 NextResponse 내부 쿠키 목록을 기준으로 Set-Cookie 를 다시 쓴다.
    // relay 보다 뒤에 두면 직접 append 한 인증 쿠키가 지워지므로 순서를 바꾸지 말 것.
    response.cookies.delete(LEGACY_SESSION_COOKIE_NAME);
    relaySetCookies(loginResponse.headers, response.headers);

    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[callback] 예외 발생:', error);
    return NextResponse.redirect(new URL(`/${state}/login`, request.url));
  }
}
