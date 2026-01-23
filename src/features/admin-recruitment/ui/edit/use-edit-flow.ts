import { useState } from 'react';
import { ClubRecruitments } from '@/views/club/model/type';
import { EditStep, EditFlowState } from './types';

const EDIT_STEPS: EditStep[] = [
  'selectPost',
  'basicInfo',
  'postinfo',
  'complete',
];

function useEditFlow() {
  const [state, setState] = useState<EditFlowState>({
    currentStep: 'selectPost',
    selectedPost: undefined,
    isSubmitting: false,
  });

  const startEdit = (post: ClubRecruitments) => {
    setState((prev) => ({
      ...prev,
      currentStep: 'basicInfo',
      selectedPost: post,
    }));
  };

  const nextStep = () => {
    const idx = EDIT_STEPS.indexOf(state.currentStep);
    if (idx < EDIT_STEPS.length - 1) {
      setState((prev) => ({ ...prev, currentStep: EDIT_STEPS[idx + 1] }));
    }
  };

  const prevStep = () => {
    const idx = EDIT_STEPS.indexOf(state.currentStep);
    if (idx > 0) {
      setState((prev) => ({ ...prev, currentStep: EDIT_STEPS[idx - 1] }));
    }
  };

  const goToSelectPost = () => {
    setState((prev) => ({
      ...prev,
      currentStep: 'selectPost',
    }));
  };

  const setSubmitting = (isSubmitting: boolean) => {
    setState((prev) => ({ ...prev, isSubmitting }));
  };

  const complete = () => {
    setState((prev) => ({ ...prev, currentStep: 'complete' }));
  };

  const reset = () => {
    setState({
      currentStep: 'selectPost',
      selectedPost: undefined,
      isSubmitting: false,
    });
  };

  return {
    ...state,
    startEdit,
    nextStep,
    prevStep,
    goToSelectPost,
    setSubmitting,
    complete,
    reset,
  };
}

export default useEditFlow;
