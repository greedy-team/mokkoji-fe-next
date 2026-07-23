'use client';

import { useState } from 'react';
import ClubManagementWidget from '@/widgets/admin/ui/ClubManagementWidget';

interface AdminMainViewProps {
  dashboardContent: React.ReactNode;
}

type Tab = 'dashboard' | 'clubs';

function AdminMainView({ dashboardContent }: AdminMainViewProps) {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  return (
    <div className="flex flex-col gap-8 px-[140px] pt-4 pb-10">
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setActiveTab('dashboard')}
          className={
            activeTab === 'dashboard'
              ? 'flex h-[50px] items-center justify-center rounded-[30px] bg-[#4AF38A] px-5 text-[16px] leading-[140%] font-medium text-[#000000]'
              : 'flex h-[50px] items-center justify-center rounded-[30px] border border-[#D6D6D6] px-5 text-[16px] leading-[140%] font-medium text-[#7F7F7F]'
          }
        >
          대시보드
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('clubs')}
          className={
            activeTab === 'clubs'
              ? 'flex h-[50px] items-center justify-center rounded-[30px] bg-[#4AF38A] px-5 text-[16px] leading-[140%] font-medium text-[#000000]'
              : 'flex h-[50px] items-center justify-center rounded-[30px] border border-[#D6D6D6] px-5 text-[16px] leading-[140%] font-medium text-[#7F7F7F]'
          }
        >
          동아리 관리
        </button>
      </div>

      {activeTab === 'dashboard' && dashboardContent}

      {activeTab === 'clubs' && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-[20px] leading-[140%] font-semibold tracking-[-0.03em] text-[#000000]">
              동아리 관리
            </h2>
            <p className="text-[14px] leading-[140%] font-medium tracking-[-0.03em] text-[#8B95A1]">
              동아리를 등록 및 삭제할 수 있어요.
            </p>
          </div>
          <ClubManagementWidget />
        </div>
      )}
    </div>
  );
}

export default AdminMainView;
