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

  if (!code) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const loginResponse = await serverApi.post('users/auth/kakao', {
      json: { code },
    });

    const loginResponseBody: LoginSuccessResponse = await loginResponse.json();

    if (!loginResponseBody.data) {
      return NextResponse.json(
        { ok: false, message: '로그인 실패' },
        { status: 401 },
      );
    }

    const { accessToken, refreshToken, isNewUser } = loginResponseBody.data;

    const userResponse = await serverApi.get('users', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const userResponseBody: { data: UserInfoType } = await userResponse.json();

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

    const session: CookieSession = {
      accessToken,
      refreshToken,
      user: userResponseBody.data.user,
      role: role as CookieSession['role'],
      expiresAt: getTokenExpiration(accessToken) ?? undefined,
    };

    const redirectUrl = isNewUser ? '/?newUser=true' : '/';
    const response = NextResponse.redirect(new URL(redirectUrl, request.url));
    response.cookies.set(buildSessionCookie(session));

    return response;
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
