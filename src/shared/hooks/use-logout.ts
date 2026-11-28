'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import clientApi from '@/shared/api/client-api';
import { useSession } from '@/shared/lib/session-context';
import useUniversityCode from '@/shared/hooks/use-university-code';

export default function useLogout() {
  const router = useRouter();
  const { refresh } = useSession();
  const universityCode = useUniversityCode();

  return useCallback(async () => {
    // 이미 만료돼 실패해도 화면은 로그아웃 상태로 돌린다
    await clientApi.post('users/auth/logout').catch(() => undefined);
    await refresh();
    router.replace(`/${universityCode}`);
    router.refresh();
  }, [router, refresh, universityCode]);
}
