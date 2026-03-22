'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CreateStep } from './types';

function useCreateFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setSubmitting] = useState(false);

  const currentStep = (searchParams.get('step') as CreateStep) ?? 'basicInfo';

  const complete = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('step', 'complete');
    router.replace(`?${params.toString()}`);
  };

  const reset = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('step', 'basicInfo');
    router.replace(`?${params.toString()}`);
  };

  return {
    currentStep,
    isSubmitting,
    setSubmitting,
    complete,
    reset,
  };
}

export default useCreateFlow;
