'use client';

import { PrevButton } from '@/shared/ui/navigation-button';

interface AdminPageHeaderProps {
  title: string;
  onBack: () => void;
}

function AdminPageHeader({ title, onBack }: AdminPageHeaderProps) {
  return (
    <div className="mb-4 flex items-center gap-2 lg:gap-4">
      <PrevButton onClick={onBack} />
      <h1 className="text-base font-bold lg:text-[28px]">{title}</h1>
    </div>
  );
}

export default AdminPageHeader;
