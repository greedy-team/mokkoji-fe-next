'use client';

import { useState } from 'react';
import type {
  ClubMasterApplication,
  ClubApplication,
  AdminClub,
} from '@/features/admin/model/dashboard-types';
import ClubMasterApplicationWidget from '@/widgets/admin/ui/ClubMasterApplicationWidget';
import ClubApplicationWidget from '@/widgets/admin/ui/ClubApplicationWidget';
import AdminClubListWidget from '@/widgets/admin/ui/AdminClubListWidget';

type DashboardTab = 'dashboard' | 'clubApplication' | 'clubList';

const TABS: { label: string; value: DashboardTab }[] = [
  { label: '대시보드', value: 'dashboard' },
  { label: '동아리 생성 신청', value: 'clubApplication' },
  { label: '동아리 목록', value: 'clubList' },
];

interface AdminDashboardViewProps {
  clubMasterApplications: ClubMasterApplication[];
  clubApplications: ClubApplication[];
  clubs: AdminClub[];
  totalClubs: number;
  pendingMasterCount: number;
  pendingClubCount: number;
  totalMasters: number;
}

function AdminDashboardView({
  clubMasterApplications,
  clubApplications,
  clubs,
  totalClubs,
  pendingMasterCount,
  pendingClubCount,
  totalMasters,
}: AdminDashboardViewProps) {
  const [activeTab, setActiveTab] = useState<DashboardTab>('dashboard');

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="flex flex-col gap-8 px-[140px] py-6">
        <div className="flex items-center gap-4">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value)}
              className={
                activeTab === tab.value
                  ? 'flex h-[50px] items-center justify-center rounded-[30px] bg-[#4AF38A] px-5 text-[16px] leading-[140%] font-medium text-[#000000]'
                  : 'flex h-[50px] items-center justify-center rounded-[30px] bg-[#F8F8F8] px-5 text-[16px] leading-[140%] font-medium text-[#8B95A1]'
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'dashboard' && (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <h2 className="text-[20px] leading-[140%] font-semibold tracking-[-0.03em] text-[#000000]">
                전체 동아리 현황
              </h2>
              <p className="text-[14px] leading-[140%] font-medium tracking-[-0.03em] text-[#8B95A1]">
                학교 동아리 현황과 신청을 한눈에 관리할 수 있어요.
              </p>
            </div>
            <div className="flex items-center gap-5">
              <div className="relative h-[117px] w-[178px] rounded-[20px] bg-[#F8F8F8]">
                <span className="absolute top-4 left-5 text-[16px] leading-[140%] font-medium text-[#474747]">
                  등록된 동아리
                </span>
                <span className="absolute right-5 bottom-4 text-[36px] leading-[140%] font-bold text-[#474747]">
                  {totalClubs}개
                </span>
              </div>
              <div className="relative h-[117px] w-[175px] rounded-[20px] bg-[#F8F8F8]">
                <span className="absolute top-4 left-5 text-[16px] leading-[140%] font-medium text-[#474747]">
                  승인 대기
                </span>
                <span className="absolute right-5 bottom-4 text-[36px] leading-[140%] font-bold text-[#474747]">
                  {pendingMasterCount}건
                </span>
              </div>
              <div className="relative h-[117px] w-[177px] rounded-[20px] bg-[#F8F8F8]">
                <span className="absolute top-4 left-5 text-[16px] leading-[140%] font-medium text-[#474747]">
                  신규 신청
                </span>
                <span className="absolute right-5 bottom-4 text-[36px] leading-[140%] font-bold text-[#474747]">
                  {pendingClubCount}건
                </span>
              </div>
              <div className="relative h-[117px] w-[176px] rounded-[20px] bg-[#F8F8F8]">
                <span className="absolute top-4 left-5 text-[16px] leading-[140%] font-medium text-[#474747]">
                  전체 동아리장
                </span>
                <span className="absolute right-5 bottom-4 text-[36px] leading-[140%] font-bold text-[#474747]">
                  {totalMasters}명
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h3 className="text-[20px] leading-[140%] font-semibold tracking-[-0.03em] text-[#000000]">
                  최근 승인 대기 신청
                </h3>
                <p className="text-[14px] leading-[140%] font-medium tracking-[-0.03em] text-[#8B95A1]">
                  현재 승인 대기 중인 신청을 확인하고 처리할 수 있어요.
                </p>
              </div>
              <ClubMasterApplicationWidget
                initialApplications={clubMasterApplications}
              />
            </div>
          </div>
        )}

        {activeTab === 'clubApplication' && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="text-[20px] leading-[140%] font-semibold tracking-[-0.03em] text-[#000000]">
                동아리 생성 신청 목록
              </h3>
              <p className="text-[14px] leading-[140%] font-medium tracking-[-0.03em] text-[#8B95A1]">
                동아리 생성 신청을 검토하고 승인 또는 반려할 수 있어요.
              </p>
            </div>
            <ClubApplicationWidget initialApplications={clubApplications} />
          </div>
        )}

        {activeTab === 'clubList' && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="text-[20px] leading-[140%] font-semibold tracking-[-0.03em] text-[#000000]">
                전체 동아리 목록
              </h3>
              <p className="text-[14px] leading-[140%] font-medium tracking-[-0.03em] text-[#8B95A1]">
                등록된 동아리와 동아리장 연결 현황을 확인할 수 있어요.
              </p>
            </div>
            <AdminClubListWidget clubs={clubs} />
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboardView;
