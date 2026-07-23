/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';
import { HTTPError } from 'ky';
import serverApi from '@/shared/api/server-api';
import { buildDashboardSessionCookie } from '@/shared/lib/dashboard-session';

interface AdminLoginResponse {
  data?: {
    accessToken: string;
    refreshToken: string;
  };
}

export async function POST(req: NextRequest) {
  try {
    const { loginId, password } = await req.json();

    const loginResponse = await serverApi.post('admin/auth/login', {
      json: { loginId, password },
    });
    const body: AdminLoginResponse = await loginResponse.json();

    if (!body.data?.accessToken) {
      return NextResponse.json(
        { ok: false, message: '로그인 실패' },
        { status: 401 },
      );
    }

    const { accessToken } = body.data;
    const response = NextResponse.json({ ok: true });
    response.cookies.set(buildDashboardSessionCookie({ accessToken }));
    return response;
  } catch (error) {
    if (error instanceof HTTPError) {
      const { status } = error.response;
      const message =
        status === 404
          ? '등록되지 않은 계정입니다.'
          : '아이디 또는 비밀번호를 확인해주세요.';
      return NextResponse.json({ ok: false, message }, { status });
    }
    console.error('[dashboard-login error]', error);
    return NextResponse.json(
      { ok: false, message: '로그인 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
