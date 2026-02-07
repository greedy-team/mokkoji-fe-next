'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import type { AdminClubInfo, ContentType, ActionType, Step } from './types';

function useAdminFlow(allowedClubs: AdminClubInfo[]) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isSingleClub = allowedClubs.length === 1;
  const initialClub = isSingleClub ? allowedClubs[0] : undefined;

  const step = (searchParams.get('step') as Step) || 'selectClub';
  const selectedClubId = searchParams.get('clubId')
    ? Number(searchParams.get('clubId'))
    : initialClub?.clubId;
  const selectedClubName =
    searchParams.get('clubName') || initialClub?.clubName;

  useEffect(() => {
    if (isSingleClub && step === 'selectClub' && initialClub) {
      const params = new URLSearchParams();
      params.set('step', 'actionMode');
      params.set('clubId', String(initialClub.clubId));
      params.set('clubName', initialClub.clubName);
      router.replace(`/admin?${params.toString()}`);
    }
  }, [isSingleClub, step, initialClub, router]);

  const validateClubAccess = (clubId: number) => {
    return allowedClubs.some((club) => club.clubId === clubId);
  };

  const selectClub = (clubId: number, clubName: string) => {
    if (!validateClubAccess(clubId)) {
      toast.error('접근 권한이 없는 동아리입니다.');
      return;
    }

    const params = new URLSearchParams();
    params.set('step', 'actionMode');
    params.set('clubId', String(clubId));
    params.set('clubName', clubName);
    router.push(`/admin?${params.toString()}`);
  };

  const selectAction = (contentType: ContentType, actionType: ActionType) => {
    if (selectedClubId) {
      router.push(`/admin/${contentType}/${actionType}/${selectedClubId}`);
    }
  };

  const goBack = () => router.back();

  const reset = () => router.push('/admin');

  return {
    step: isSingleClub && step === 'selectClub' ? 'actionMode' : step,
    selectedClubId,
    selectedClubName,
    selectClub,
    selectAction,
    goBack,
    reset,
    validateClubAccess,
  };
}

export default useAdminFlow;
