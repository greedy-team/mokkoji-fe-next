'use client';

import { UserRole } from '@/shared/model/type';
import AdminStepLayout from '../components/admin-step-layout';
import MenuButton from '../components/menu-button';
import type { ActionType, ContentType } from '../../model/types';

interface StepSelectEditModeProps {
  clubName?: string;
  contentType?: ContentType;
  role?: UserRole;
  onNext: (actionType: ActionType) => void;
  onBack: () => void;
}

function StepSelectEditMode({
  clubName,
  contentType,
  role,
  onNext,
  onBack,
}: StepSelectEditModeProps) {
  const isDescription = contentType === 'description';
  const isGreedyAdmin = role === UserRole.GREEDY_ADMIN;

  return (
    <AdminStepLayout
      clubName={clubName}
      backButtonLabel="콘텐츠 다시 선택하기"
      onBack={onBack}
    >
      {isDescription ? (
        <>
          {isGreedyAdmin && (
            <MenuButton label="소개글 등록" onClick={() => onNext('create')} />
          )}
          <MenuButton label="소개글 수정" onClick={() => onNext('edit')} />
        </>
      ) : (
        <>
          <MenuButton label="모집글 생성" onClick={() => onNext('create')} />
          <MenuButton
            label="모집글 수정 및 삭제"
            onClick={() => onNext('edit')}
          />
        </>
      )}
    </AdminStepLayout>
  );
}

export default StepSelectEditMode;
