'use client';

import { Suspense } from 'react';
import { UserRole } from '@/shared/model/type';
import SharedLoading from '@/shared/ui/loading';
import type { AdminClubInfo } from '../model/types';
import useAdminFlow from '../model/use-admin-flow';
import StepSelectClub from './steps/step-select-club';
import StepSelectActionMode from './steps/step-select-action-mode';

interface AdminFlowContainerProps {
  allowedClubs: AdminClubInfo[];
  role?: UserRole;
}

function AdminFlowContent({ allowedClubs, role }: AdminFlowContainerProps) {
  const flow = useAdminFlow(allowedClubs);

  return (
    <div style={{ animation: 'var(--animate-reveal)' }}>
      {flow.step === 'selectClub' && (
        <StepSelectClub
          clubs={allowedClubs}
          role={role}
          onNext={flow.selectClub}
        />
      )}

      {flow.step === 'actionMode' && (
        <StepSelectActionMode
          clubName={flow.selectedClubName}
          onNext={flow.selectAction}
          onBack={flow.goBack}
        />
      )}
    </div>
  );
}

function AdminFlowContainer({ allowedClubs, role }: AdminFlowContainerProps) {
  return (
    <Suspense fallback={<SharedLoading />}>
      <AdminFlowContent allowedClubs={allowedClubs} role={role} />
    </Suspense>
  );
}

export default AdminFlowContainer;
