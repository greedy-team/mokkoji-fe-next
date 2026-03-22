'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { EditStep } from './types';

const EDIT_STEPS: EditStep[] = ['basicInfo', 'description', 'complete'];
const DEFAULT_STEP: EditStep = 'basicInfo';

function useEditFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setSubmitting] = useState(false);

  const currentStep = (searchParams.get('step') as EditStep) ?? DEFAULT_STEP;

  const nextStep = () => {
    const idx = EDIT_STEPS.indexOf(currentStep);
    if (idx < EDIT_STEPS.length - 1) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('step', EDIT_STEPS[idx + 1]);
      router.push(`?${params.toString()}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    const idx = EDIT_STEPS.indexOf(currentStep);
    if (idx > 0) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('step', EDIT_STEPS[idx - 1]);
      router.push(`?${params.toString()}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const complete = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('step', 'complete');
    router.replace(`?${params.toString()}`);
  };

  const reset = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('step', DEFAULT_STEP);
    router.replace(`?${params.toString()}`);
  };

  return {
    currentStep,
    isSubmitting,
    setSubmitting,
    nextStep,
    prevStep,
    complete,
    reset,
  };
}

export default useEditFlow;
