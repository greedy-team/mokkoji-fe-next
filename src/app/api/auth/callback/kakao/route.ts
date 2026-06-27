/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';
import serverApi from '@/shared/api/server-api';
import {
  LoginSuccessResponse,
  RoleResponse,
} from '@/features/login/model/type';
import UserInfoType from '@/entities/my/model/type';
import getTokenExpiration from '@/shared/lib/getTokenExpiration';
import { buildSessionCookie, CookieSession } from '@/shared/lib/cookie-session';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  const state = searchParams.get('state') ?? 'sejong';

  if (!code) {
    return NextResponse.redirect(new URL(`/${state}/login`, request.url));
  }

  try {
    // eslint-disable-next-line no-console
    console.log('[callback] Origin header:', process.env.NEXT_PUBLIC_BASE_URL);
    const loginResponse = await serverApi.post('users/auth/kakao', {
      json: { code },
      headers: { Origin: process.env.NEXT_PUBLIC_BASE_URL },
    });

    const loginResponseBody: LoginSuccessResponse = await loginResponse.json();
    // eslint-disable-next-line no-console
    console.log(
      '[callback] login response:',
      JSON.stringify(loginResponseBody),
    );

    if (!loginResponseBody.data) {
      return NextResponse.redirect(new URL(`/${state}/login`, request.url));
    }

    const { accessToken, refreshToken, isNewUser } = loginResponseBody.data;

    const userResponse = await serverApi.get('users', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const userResponseBody: { data: UserInfoType } = await userResponse.json();
    // eslint-disable-next-line no-console
    console.log('[callback] user response:', JSON.stringify(userResponseBody));

    let role: string | undefined;
    try {
      const rolesResponse = await serverApi.get('users/roles', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const rolesResponseBody: RoleResponse = await rolesResponse.json();
      role = rolesResponseBody.data?.role;
    } catch {
      // role 조회 실패해도 로그인은 성공 처리
    }

    const apiUniversityCode = (
      userResponseBody.data.universityCode ?? 'SEJONG'
    ).toUpperCase();

    const session: CookieSession = {
      accessToken,
      refreshToken,
      user: userResponseBody.data,
      role: role as CookieSession['role'],
      expiresAt: getTokenExpiration(accessToken) ?? undefined,
      universityCode: apiUniversityCode,
    };

    const redirectUrl = isNewUser
      ? `/${state}/my?newUser=true`
      : `/${state}/my`;
    const response = NextResponse.redirect(new URL(redirectUrl, request.url));
    response.cookies.set(buildSessionCookie(session));

    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[callback] 예외 발생:', error);
    return NextResponse.redirect(new URL(`/${state}/login`, request.url));
  }
}
