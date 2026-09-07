'use client';

import { useState } from 'react';
import { parseAsInteger, parseAsStringLiteral, useQueryState } from 'nuqs';
import { ClubRecruitments } from '@/entities/club-detail/model/type';
import { EditStep } from './types';

const EDIT_STEPS = [
  'selectPostEditStep',
  'basicInfoEditStep',
  'postInfoEditStep',
  'completeEditStep',
] as const satisfies readonly EditStep[];
const DEFAULT_STEP: EditStep = 'selectPostEditStep';

const stepParser = parseAsStringLiteral(EDIT_STEPS).withDefault(DEFAULT_STEP);

// nuqs는 Next 라우터 대신 브라우저 history API로 URL을 바꾼다.
// RSC 요청이 없으므로 스텝 전환이 즉시 일어난다.
function useEditFlow() {
  const [currentStep, setCurrentStep] = useQueryState('step', stepParser);
  const [selectedPostId, setSelectedPostId] = useQueryState(
    'postId',
    parseAsInteger,
  );
  const [selectedPost, setSelectedPost] = useState<
    ClubRecruitments | undefined
  >(undefined);
  const [isSubmitting, setSubmitting] = useState(false);

  const goToStep = (step: EditStep, history: 'push' | 'replace' = 'push') => {
    setCurrentStep(step, { history });
  };

  const startEdit = (post: ClubRecruitments) => {
    setSelectedPost(post);
    setSelectedPostId(post.id);
    goToStep('basicInfoEditStep');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextStep = () => {
    const index = EDIT_STEPS.indexOf(currentStep);
    if (index < EDIT_STEPS.length - 1) {
      goToStep(EDIT_STEPS[index + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    const index = EDIT_STEPS.indexOf(currentStep);
    if (index > 0) {
      goToStep(EDIT_STEPS[index - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToSelectPost = () => {
    setSelectedPostId(null);
    goToStep('selectPostEditStep');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const complete = () => goToStep('completeEditStep', 'replace');

  const reset = () => {
    setSelectedPostId(null);
    goToStep(DEFAULT_STEP, 'replace');
  };

  return {
    currentStep,
    selectedPost,
    selectedPostId,
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
