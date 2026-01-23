'use client';

import AdminStepLayout from '../components/admin-step-layout';
import MenuButton from '../components/menu-button';
import type { ContentType } from '../../model/types';

interface StepSelectPostTypeProps {
  clubName?: string;
  onNext: (contentType: ContentType) => void;
  onBack: () => void;
}

function StepSelectPostType({
  clubName,
  onNext,
  onBack,
}: StepSelectPostTypeProps) {
  return (
    <AdminStepLayout
      clubName={clubName}
      backButtonLabel="동아리 다시 선택하기"
      onBack={onBack}
    >
      <MenuButton label="모집글" onClick={() => onNext('recruitment')} />
      <MenuButton label="소개글" onClick={() => onNext('description')} />
    </AdminStepLayout>
  );
}

export default StepSelectPostType;
