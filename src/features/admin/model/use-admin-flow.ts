'use client';

import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import type {
  AdminClubInfo,
  ContentType,
  ActionType,
  AdminFlowState,
} from './types';

function useAdminFlow(allowedClubs: AdminClubInfo[]) {
  const [state, setState] = useState<AdminFlowState>({
    step: 'selectClub',
    selectedClubId: undefined,
    selectedClubName: undefined,
    contentType: undefined,
    actionType: undefined,
  });

  const validateClubAccess = useCallback(
    (clubId: number) => {
      return allowedClubs.some((club) => club.clubId === clubId);
    },
    [allowedClubs],
  );

  const selectClub = useCallback(
    (clubId: number, clubName: string) => {
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
    },
    [validateClubAccess],
  );

  const selectContentType = useCallback((contentType: ContentType) => {
    setState((prev) => ({
      ...prev,
      step: 'editMode',
      contentType,
    }));
  }, []);

  const selectActionType = useCallback((actionType: ActionType) => {
    setState((prev) => ({
      ...prev,
      actionType,
      isReadyToRedirect: true,
    }));
  }, []);

  const goBack = useCallback(() => {
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
  }, []);

  const reset = useCallback(() => {
    setState({
      step: 'selectClub',
      selectedClubId: undefined,
      selectedClubName: undefined,
      contentType: undefined,
      actionType: undefined,
    });
  }, []);

  const getRedirectUrl = useCallback(() => {
    if (
      state.isReadyToRedirect &&
      state.selectedClubId &&
      state.contentType &&
      state.actionType
    ) {
      return `/admin/${state.contentType}/${state.actionType}/${state.selectedClubId}`;
    }
    return null;
  }, [
    state.isReadyToRedirect,
    state.selectedClubId,
    state.contentType,
    state.actionType,
  ]);

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
