'use client';

import { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';
import type { AdminClubInfo } from '../model/types';
import useAdminFlow from '../model/use-admin-flow';
import StepSelectClub from './steps/step-select-club';
import StepSelectPostType from './steps/step-select-post-type';
import StepSelectEditMode from './steps/step-select-edit-mode';

interface AdminFlowContainerProps {
  allowedClubs: AdminClubInfo[];
}

function AdminFlowContainer({ allowedClubs }: AdminFlowContainerProps) {
  const flow = useAdminFlow(allowedClubs);
  const [currentStep, setCurrentStep] = useState(flow.step);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (flow.redirectUrl) {
      redirect(flow.redirectUrl);
    }

    if (flow.step !== currentStep) {
      setIsTransitioning(true);

      const timer = setTimeout(() => {
        setCurrentStep(flow.step);
        setIsTransitioning(false);
      }, 500);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [flow.redirectUrl, flow.step, currentStep]);

  return (
    <div
      style={{
        animation: isTransitioning
          ? 'var(--animate-fadeout)'
          : 'var(--animate-reveal)',
      }}
    >
      {currentStep === 'selectClub' && (
        <StepSelectClub clubs={allowedClubs} onNext={flow.selectClub} />
      )}

      {currentStep === 'postType' && (
        <StepSelectPostType
          clubName={flow.selectedClubName}
          onNext={flow.selectContentType}
          onBack={flow.goBack}
        />
      )}

      {currentStep === 'editMode' && (
        <StepSelectEditMode
          clubName={flow.selectedClubName}
          contentType={flow.contentType}
          onNext={flow.selectActionType}
          onBack={flow.goBack}
        />
      )}
    </div>
  );
}

export default AdminFlowContainer;
