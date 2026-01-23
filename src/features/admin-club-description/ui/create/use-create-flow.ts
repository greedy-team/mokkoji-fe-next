import { useState } from 'react';
import { CreateFlowState } from './types';

function useCreateFlow() {
  const [state, setState] = useState<CreateFlowState>({
    currentStep: 'basicInfo',
    isSubmitting: false,
  });

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
    setSubmitting,
    complete,
    reset,
  };
}

export default useCreateFlow;
