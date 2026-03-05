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

export async function POST(req: NextRequest) {
  try {
    const { studentId, password } = await req.json();

    const loginRes = await serverApi.post('users/auth/login', {
      json: { studentId, password },
    });
    const loginData: LoginSuccessResponse = await loginRes.json();

    if (!loginData.data) {
      return NextResponse.json(
        { ok: false, message: '로그인 실패' },
        { status: 401 },
      );
    }

    const { accessToken, refreshToken } = loginData.data;

    const userRes = await serverApi.get('users', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const userData: { data: UserInfoType } = await userRes.json();

    let role: string | undefined;
    try {
      const rolesRes = await serverApi.get('users/roles', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const rolesData: RoleResponse = await rolesRes.json();
      role = rolesData.data?.role;
    } catch {
      // role 조회 실패해도 로그인은 성공 처리
    }

    const session: CookieSession = {
      accessToken,
      refreshToken,
      user: userData.data.user,
      role: role as CookieSession['role'],
      expiresAt: getTokenExpiration(accessToken) ?? undefined,
    };

    const response = NextResponse.json({
      ok: true,
      data: { user: session.user, role: session.role },
    });

    response.cookies.set(buildSessionCookie(session));

    return response;
  } catch (error) {
    console.error('[cookie-login error]', error);
    return NextResponse.json(
      { ok: false, message: '학번 또는 비밀번호를 확인해주세요.' },
      { status: 401 },
    );
  }
}
