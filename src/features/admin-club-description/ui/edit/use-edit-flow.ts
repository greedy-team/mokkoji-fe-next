import { useState } from 'react';
import { EditStep, EditFlowState } from './types';

const EDIT_STEPS: EditStep[] = ['basicInfo', 'description', 'complete'];

function useEditFlow() {
  const [state, setState] = useState<EditFlowState>({
    currentStep: 'basicInfo',
    isSubmitting: false,
  });

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

  const setSubmitting = (isSubmitting: boolean) => {
    setState((prev) => ({ ...prev, isSubmitting }));
  };

  const complete = () => {
    setState((prev) => ({ ...prev, currentStep: 'complete' }));
  };

  const reset = () => {
    setState({
      currentStep: 'basicInfo',
      isSubmitting: false,
    });
  };

  return {
    ...state,
    nextStep,
    prevStep,
    setSubmitting,
    complete,
    reset,
  };
}

export default useEditFlow;
