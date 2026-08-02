'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import clientApi from '@/shared/api/client-api';
import { useSession } from '@/shared/lib/session-context';
import useUniversityCode from '@/shared/hooks/useUniversityCode';

export default function useLogout() {
  const router = useRouter();
  const { refresh } = useSession();
  const universityCode = useUniversityCode();

  return useCallback(async () => {
    await clientApi.post('api/auth/logout');
    refresh();
    router.replace(`/${universityCode}`);
    router.refresh();
  }, [router, refresh, universityCode]);
}
