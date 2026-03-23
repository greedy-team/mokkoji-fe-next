'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CreateStep } from './types';

function useCreateFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setSubmitting] = useState(false);

  const currentStep =
    (searchParams.get('step') as CreateStep) ?? 'basicInfoCreateStep';

  const complete = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('step', 'completeCreateStep');
    router.replace(`?${params.toString()}`);
  };

  const reset = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('step', 'basicInfoCreateStep');
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
