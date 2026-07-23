'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ClubRecruitments } from '@/entities/club-detail/model/type';
import { EditStep } from './types';

const EDIT_STEPS: EditStep[] = [
  'selectPostEditStep',
  'basicInfoEditStep',
  'postInfoEditStep',
  'completeEditStep',
];
const DEFAULT_STEP: EditStep = 'selectPostEditStep';

function useEditFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedPost, setSelectedPost] = useState<
    ClubRecruitments | undefined
  >(undefined);
  const [isSubmitting, setSubmitting] = useState(false);

  const currentStep = (searchParams.get('step') as EditStep) ?? DEFAULT_STEP;

  const startEdit = (post: ClubRecruitments) => {
    setSelectedPost(post);
    const params = new URLSearchParams(searchParams.toString());
    params.set('step', 'basicInfoEditStep');
    router.push(`?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  const goToSelectPost = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('step', 'selectPostEditStep');
    router.push(`?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const complete = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('step', 'completeEditStep');
    router.replace(`?${params.toString()}`);
  };

  const reset = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('step', DEFAULT_STEP);
    router.replace(`?${params.toString()}`);
  };

  return {
    currentStep,
    selectedPost,
    isSubmitting,
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
