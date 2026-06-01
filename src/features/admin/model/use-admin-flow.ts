'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import type { AdminClubInfo, ContentType, ActionType, Step } from './types';

function useAdminFlow(allowedClubs: AdminClubInfo[]) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { universityCode } = useParams<{ universityCode: string }>();
  const adminBase = `/${universityCode}/admin`;

  const isSingleClub = allowedClubs.length === 1;
  const initialClub = isSingleClub ? allowedClubs[0] : undefined;

  const step = (searchParams.get('step') as Step) || 'selectClub';
  const selectedClubId = searchParams.get('clubId')
    ? Number(searchParams.get('clubId'))
    : initialClub?.clubId;
  const selectedClubName = allowedClubs.find(
    (club) => club.clubId === selectedClubId,
  )?.clubName;

  useEffect(() => {
    if (isSingleClub && step === 'selectClub' && initialClub) {
      const urlParams = new URLSearchParams();
      urlParams.set('step', 'actionMode');
      urlParams.set('clubId', String(initialClub.clubId));
      router.replace(`${adminBase}?${urlParams.toString()}`);
    }
  }, [isSingleClub, step, initialClub, router, adminBase]);

  const validateClubAccess = (clubId: number) => {
    return allowedClubs.some((club) => club.clubId === clubId);
  };

  const selectClub = (clubId: number) => {
    if (!validateClubAccess(clubId)) {
      toast.error('접근 권한이 없는 동아리입니다.');
      return;
    }

    const urlParams = new URLSearchParams();
    urlParams.set('step', 'actionMode');
    urlParams.set('clubId', String(clubId));
    router.push(`${adminBase}?${urlParams.toString()}`);
  };

  const selectAction = (contentType: ContentType, actionType: ActionType) => {
    if (selectedClubId) {
      router.push(
        `${adminBase}/${contentType}/${actionType}/${selectedClubId}`,
      );
    }
  };

  const reset = () => router.push(adminBase);

  return {
    step: isSingleClub && step === 'selectClub' ? 'actionMode' : step,
    selectedClubId,
    selectedClubName,
    selectClub,
    selectAction,
    reset,
    validateClubAccess,
  };
}

export default useAdminFlow;
