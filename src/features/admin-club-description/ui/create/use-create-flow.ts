'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { CreateStep } from './types';

function useCreateFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();

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
    complete,
    reset,
  };
}

export default useCreateFlow;
