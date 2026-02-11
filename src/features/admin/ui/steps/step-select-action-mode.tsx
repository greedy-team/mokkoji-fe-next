'use client';

import AdminStepLayout from '../components/admin-step-layout';
import MenuButton from '../components/menu-button';
import type { ContentType, ActionType } from '../../model/types';

interface StepSelectActionModeProps {
  clubName?: string;
  onNext: (contentType: ContentType, actionType: ActionType) => void;
  onBack: () => void;
}

function StepSelectActionMode({
  clubName,
  onNext,
  onBack,
}: StepSelectActionModeProps) {
  return (
    <AdminStepLayout
      clubName={clubName}
      backButtonLabel="동아리 다시 선택하기"
      onBack={onBack}
    >
      <MenuButton
        label="모집글 수정 및 삭제"
        onClick={() => onNext('recruitment', 'edit')}
      />
      <MenuButton
        label="모집글 생성"
        onClick={() => onNext('recruitment', 'create')}
      />
      <MenuButton
        label="동아리 정보 수정"
        onClick={() => onNext('description', 'edit')}
      />
    </AdminStepLayout>
  );
}

export default StepSelectActionMode;
