'use client';

import { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';
import { UserRole } from '@/shared/model/type';
import type { AdminClubInfo } from '../model/types';
import useAdminFlow from '../model/use-admin-flow';
import StepSelectClub from './steps/step-select-club';
import StepSelectActionMode from './steps/step-select-action-mode';

interface AdminFlowContainerProps {
  allowedClubs: AdminClubInfo[];
  role?: UserRole;
}

function AdminFlowContainer({ allowedClubs, role }: AdminFlowContainerProps) {
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <StepSelectClub
          clubs={allowedClubs}
          role={role}
          onNext={flow.selectClub}
        />
      )}

      {currentStep === 'actionMode' && (
        <StepSelectActionMode
          clubName={flow.selectedClubName}
          onNext={flow.selectAction}
          onBack={flow.goBack}
        />
      )}
    </div>
  );
}

export default AdminFlowContainer;
