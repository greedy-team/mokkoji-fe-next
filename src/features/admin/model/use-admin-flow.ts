'use client';

import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import type {
  Step,
  AdminClubInfo,
  ContentType,
  ActionType,
  AdminFlowState,
} from './types';

function useAdminFlow(allowedClubs: AdminClubInfo[]) {
  const [state, setState] = useState<AdminFlowState>({
    step: '1',
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
        step: '2',
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
      step: '3',
      contentType,
    }));
  }, []);

  const selectActionType = useCallback((actionType: ActionType) => {
    setState((prev) => ({
      ...prev,
      step: '4',
      actionType,
    }));
  }, []);

  const goBack = useCallback(() => {
    setState((prev) => {
      const currentStep = Number(prev.step);
      if (currentStep <= 1) return prev;

      const newStep = String(currentStep - 1) as Step;

      if (newStep === '1') {
        return {
          step: newStep,
          selectedClubId: undefined,
          selectedClubName: undefined,
          contentType: undefined,
          actionType: undefined,
        };
      }
      if (newStep === '2') {
        return {
          ...prev,
          step: newStep,
          contentType: undefined,
          actionType: undefined,
        };
      }
      if (newStep === '3') {
        return {
          ...prev,
          step: newStep,
          actionType: undefined,
        };
      }

      return prev;
    });
  }, []);

  const reset = useCallback(() => {
    setState({
      step: '1',
      selectedClubId: undefined,
      selectedClubName: undefined,
      contentType: undefined,
      actionType: undefined,
    });
  }, []);

  return {
    ...state,

    selectClub,
    selectContentType,
    selectActionType,
    goBack,
    reset,
    validateClubAccess,
  };
}

export default useAdminFlow;
