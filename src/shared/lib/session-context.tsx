'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import clientApi from '@/shared/api/client-api';
import type { Session } from '@/shared/model/session';
import type { ApiResponse, UserRole } from '@/shared/model/type';
import type UserInfoType from '@/shared/model/user';

interface SessionContextValue {
  session: Session | null;
  status: 'authenticated' | 'unauthenticated';
  refresh: () => Promise<void>;
}

const SessionContext = createContext<SessionContextValue>({
  session: null,
  status: 'unauthenticated',
  refresh: async () => {},
});

async function fetchSession(): Promise<Session | null> {
  try {
    const response = await clientApi
      .get('users')
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
}

/**
 * 서버(루트 layout)가 한 번 조회한 세션을 받아 들고 있는다. 화면 권한 표시는 추가 요청 없이 이 값을 쓴다.
 * 로그아웃·정보 수정처럼 세션이 바뀐 뒤에만 refresh 로 다시 조회한다.
 */
export function AppSessionProvider({
  initialSession = null,
  children,
}: {
  initialSession?: Session | null;
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<Session | null>(initialSession);

  const refresh = useCallback(async () => {
    setSession(await fetchSession());
  }, []);

  const value = useMemo(
    () => ({
      session,
      status: session
        ? ('authenticated' as const)
        : ('unauthenticated' as const),
      refresh,
    }),
    [session, refresh],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
