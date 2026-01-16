import { useState } from 'react';
import { CreateStep, CreateFlowState } from './types';

const STEPS: CreateStep[] = ['basicInfo', 'postinfo', 'complete'];

function useCreateFlow() {
  const [state, setState] = useState<CreateFlowState>({
    currentStep: 'basicInfo',
    isSubmitting: false,
  });

  const nextStep = () => {
    const idx = STEPS.indexOf(state.currentStep);
    if (idx < STEPS.length - 1) {
      setState((prev) => ({ ...prev, currentStep: STEPS[idx + 1] }));
    }
  };

  const prevStep = () => {
    const idx = STEPS.indexOf(state.currentStep);
    if (idx > 0) {
      setState((prev) => ({ ...prev, currentStep: STEPS[idx - 1] }));
    }
  };

  const setSubmitting = (isSubmitting: boolean) => {
    setState((prev) => ({ ...prev, isSubmitting }));
  };

  const complete = () => {
    setState((prev) => ({ ...prev, currentStep: 'complete' }));
  };

  const reset = () => {
    setState({ currentStep: 'basicInfo', isSubmitting: false });
  };

  const getCurrentStepIndex = () => STEPS.indexOf(state.currentStep);
  const getTotalSteps = () => STEPS.length - 1;

  return {
    ...state,
    nextStep,
    prevStep,
    setSubmitting,
    complete,
    reset,
    getCurrentStepIndex,
    getTotalSteps,
  };
}

export default useCreateFlow;
