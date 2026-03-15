'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CreateStep } from './types';

const STEPS: CreateStep[] = ['basicInfo', 'postInfo', 'complete'];
const DEFAULT_STEP: CreateStep = 'basicInfo';

function useCreateFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentStep = (searchParams.get('step') as CreateStep) ?? DEFAULT_STEP;

  const nextStep = () => {
    const idx = STEPS.indexOf(currentStep);
    if (idx < STEPS.length - 1) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('step', STEPS[idx + 1]);
      router.push(`?${params.toString()}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    const idx = STEPS.indexOf(currentStep);
    if (idx > 0) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('step', STEPS[idx - 1]);
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
    setIsSubmitting,
    nextStep,
    prevStep,
    complete,
    reset,
  };
}

export default useCreateFlow;
