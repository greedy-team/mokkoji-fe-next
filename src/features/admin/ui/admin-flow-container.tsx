'use client';

import { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';
import type { AdminClubInfo } from '../model/types';
import StepSelectAction from './steps/step-select-action';
import useAdminFlow from '../model/use-admin-flow';
import StepSelectClub from './steps/step-select-club';
import StepSelectContent from './steps/step-select-content';

interface AdminFlowContainerProps {
  allowedClubs: AdminClubInfo[];
}

function AdminFlowContainer({ allowedClubs }: AdminFlowContainerProps) {
  const flow = useAdminFlow(allowedClubs);
  const [currentStep, setCurrentStep] = useState(flow.step);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (flow.step === '4') {
      redirect(
        `/admin/${flow.contentType}/${flow.actionType}/${flow.selectedClubId}`,
      );
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
  }, [flow.step, currentStep]);

  return (
    <div
      style={{
        animation: isTransitioning
          ? 'var(--animate-fadeout)'
          : 'var(--animate-reveal)',
      }}
    >
      {currentStep === '1' && (
        <StepSelectClub clubs={allowedClubs} onNext={flow.selectClub} />
      )}

      {currentStep === '2' && (
        <StepSelectContent
          clubName={flow.selectedClubName}
          onNext={flow.selectContentType}
          onBack={flow.goBack}
        />
      )}

      {currentStep === '3' && (
        <StepSelectAction
          clubName={flow.selectedClubName}
          onNext={flow.selectActionType}
          onBack={flow.goBack}
        />
      )}
    </div>
  );
}

export default AdminFlowContainer;
