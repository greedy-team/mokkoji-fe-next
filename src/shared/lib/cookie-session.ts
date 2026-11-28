import 'server-only';
import { cache } from 'react';
import { cookies } from 'next/headers';
import api from '@/shared/api/auth-api';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '@/shared/lib/auth-cookie';
import type { Session } from '@/shared/model/session';
import type { ApiResponse, UserRole } from '@/shared/model/type';
import type UserInfoType from '@/shared/model/user';

/**
 * 로그인한 사용자 정보와 role 을 백엔드에서 조회한다.
 * role 을 쿠키에 두면 사용자가 고칠 수 있고 권한이 바뀌어도 남으므로 백엔드 값을 쓴다.
 * cache 로 감싸 한 요청 안에서는 layout·Header·페이지가 몇 번 불러도 한 번만 조회한다.
 */
const getSession = cache(async (): Promise<Session | null> => {
  const cookieStore = await cookies();
  const hasAuthCookie =
    cookieStore.has(ACCESS_TOKEN_COOKIE_NAME) ||
    cookieStore.has(REFRESH_TOKEN_COOKIE_NAME);
  if (!hasAuthCookie) return null;

  try {
    const response = await api
      .get('users', { cache: 'no-store' })
      .json<ApiResponse<UserInfoType>>();
    if (!response.data) return null;
    return {
      user: response.data,
      role: response.data.role as UserRole,
      universityCode: response.data.universityCode ?? undefined,
    };
  } catch {
    return null;
  }
});

export default getSession;
