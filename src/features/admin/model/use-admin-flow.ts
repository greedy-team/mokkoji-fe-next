'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import type {
  AdminClubInfo,
  ContentType,
  ActionType,
  AdminFlowState,
} from './types';

function useAdminFlow(allowedClubs: AdminClubInfo[]) {
  const isSingleClub = allowedClubs.length === 1;
  const initialClub = isSingleClub ? allowedClubs[0] : undefined;

  const [state, setState] = useState<AdminFlowState>({
    step: isSingleClub ? 'postType' : 'selectClub',
    selectedClubId: initialClub?.clubId,
    selectedClubName: initialClub?.clubName,
    contentType: undefined,
    actionType: undefined,
  });

  const validateClubAccess = (clubId: number) => {
    return allowedClubs.some((club) => club.clubId === clubId);
  };

  const selectClub = (clubId: number, clubName: string) => {
    if (!validateClubAccess(clubId)) {
      toast.error('접근 권한이 없는 동아리입니다.');
      return;
    }

    setState({
      step: 'postType',
      selectedClubId: clubId,
      selectedClubName: clubName,
      contentType: undefined,
      actionType: undefined,
    });
  };

  const selectContentType = (contentType: ContentType) => {
    setState((prev) => ({
      ...prev,
      step: 'editMode',
      contentType,
    }));
  };

  const selectActionType = (actionType: ActionType) => {
    setState((prev) => ({
      ...prev,
      actionType,
      isReadyToRedirect: true,
    }));
  };

  const goBack = () => {
    setState((prev) => {
      if (prev.step === 'postType') {
        return {
          ...prev,
          step: 'selectClub',
          contentType: undefined,
          actionType: undefined,
        };
      }
      if (prev.step === 'editMode') {
        return {
          ...prev,
          step: 'postType',
          actionType: undefined,
        };
      }

      return prev;
    });
  };

  const reset = () => {
    setState({
      step: 'selectClub',
      selectedClubId: undefined,
      selectedClubName: undefined,
      contentType: undefined,
      actionType: undefined,
    });
  };

  const getRedirectUrl = () => {
    if (
      state.isReadyToRedirect &&
      state.selectedClubId &&
      state.contentType &&
      state.actionType
    ) {
      return `/admin/${state.contentType}/${state.actionType}/${state.selectedClubId}`;
    }
    return null;
  };

  return {
    ...state,
    redirectUrl: getRedirectUrl(),
    selectClub,
    selectContentType,
    selectActionType,
    goBack,
    reset,
    validateClubAccess,
  };
}

export default useAdminFlow;
