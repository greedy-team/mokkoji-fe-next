'use client';

import { useState, useTransition } from 'react';
import type {
  ClubMasterApplication,
  ClubApplication,
  ApplicationStatus,
} from '@/features/admin/model/dashboard-types';
import ApplicationTableRow from '@/features/admin/ui/ApplicationTableRow';
import approveClubMasterApplication from '@/features/admin/api/approveClubMasterApplication';
import rejectClubMasterApplication from '@/features/admin/api/rejectClubMasterApplication';
import approveClubApplication from '@/features/admin/api/approveClubApplication';
import rejectClubApplication from '@/features/admin/api/rejectClubApplication';

type SubTab = 'combined' | 'masterOnly';

interface ClubMasterApplicationWidgetProps {
  initialClubApplications: ClubApplication[];
  initialClubMasterApplications: ClubMasterApplication[];
}

function ClubMasterApplicationWidget({
  initialClubApplications,
  initialClubMasterApplications,
}: ClubMasterApplicationWidgetProps) {
  const [activeTab, setActiveTab] = useState<SubTab>('combined');
  const [clubApplications, setClubApplications] = useState(
    initialClubApplications,
  );
  const [clubMasterApplications, setClubMasterApplications] = useState(
    initialClubMasterApplications,
  );
  const [, startTransition] = useTransition();

  const pendingClubApplications = clubApplications.filter(
    (a) => a.status === 'PENDING',
  );
  const pendingMasterApplications = clubMasterApplications.filter(
    (a) => a.status === 'PENDING',
  );

  const handleCombinedApprove = (applicationId: number) => {
    startTransition(async () => {
      await Promise.all([
        approveClubApplication(applicationId),
        approveClubMasterApplication(applicationId),
      ]);
      setClubApplications((previous) =>
        previous.map((a) =>
          a.applicationId === applicationId
            ? { ...a, status: 'APPROVED' as ApplicationStatus }
            : a,
        ),
      );
    });
  };

  const handleCombinedReject = (
    applicationId: number,
    rejectReason?: string,
  ) => {
    startTransition(async () => {
      const success = await rejectClubApplication(applicationId, rejectReason);
      if (success) {
        setClubApplications((previous) =>
          previous.map((a) =>
            a.applicationId === applicationId
              ? {
                  ...a,
                  status: 'REJECTED' as ApplicationStatus,
                  rejectReason: rejectReason ?? null,
                }
              : a,
          ),
        );
      }
    });
  };

  const handleMasterApprove = (applicationId: number) => {
    startTransition(async () => {
      const success = await approveClubMasterApplication(applicationId);
      if (success) {
        setClubMasterApplications((previous) =>
          previous.map((a) =>
            a.applicationId === applicationId
              ? { ...a, status: 'APPROVED' as ApplicationStatus }
              : a,
          ),
        );
      }
    });
  };

  const handleMasterReject = (applicationId: number, rejectReason?: string) => {
    startTransition(async () => {
      const success = await rejectClubMasterApplication(
        applicationId,
        rejectReason,
      );
      if (success) {
        setClubMasterApplications((previous) =>
          previous.map((a) =>
            a.applicationId === applicationId
              ? {
                  ...a,
                  status: 'REJECTED' as ApplicationStatus,
                  rejectReason: rejectReason ?? null,
                }
              : a,
          ),
        );
      }
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('combined')}
          className={
            activeTab === 'combined'
              ? 'flex h-[38px] items-center justify-center rounded-[30px] bg-[#000000] px-[14px] text-[16px] leading-[140%] font-medium text-white'
              : 'flex h-[38px] items-center justify-center rounded-[30px] border border-[#D6D6D6] px-[14px] text-[16px] leading-[140%] font-medium text-[#7F7F7F]'
          }
        >
          동아리장 &amp; 동아리 생성
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('masterOnly')}
          className={
            activeTab === 'masterOnly'
              ? 'flex h-[38px] items-center justify-center rounded-[30px] bg-[#000000] px-[14px] text-[16px] leading-[140%] font-medium text-white'
              : 'flex h-[38px] items-center justify-center rounded-[30px] border border-[#D6D6D6] px-[14px] text-[16px] leading-[140%] font-medium text-[#7F7F7F]'
          }
        >
          동아리장
        </button>
      </div>

      {activeTab === 'combined' && (
        <div className="flex w-full flex-col">
          <div className="flex w-full items-center border-t border-b border-[#8B95A1] py-2">
            <span className="w-[120px] text-[16px] leading-[140%] font-medium text-[#000000]">
              신청일자
            </span>
            <span className="w-[160px] text-[16px] leading-[140%] font-medium text-[#000000]">
              동아리명
            </span>
            <span className="w-[100px] text-[16px] leading-[140%] font-medium text-[#000000]">
              분류
            </span>
            <span className="flex-1 text-[16px] leading-[140%] font-medium text-[#000000]">
              신청자
            </span>
            <span className="w-[152px] text-[16px] leading-[140%] font-medium text-[#000000]">
              상태
            </span>
          </div>
          {pendingClubApplications.length === 0 ? (
            <div className="py-8 text-center text-[16px] leading-[140%] font-medium text-[#8B95A1]">
              신청 내역이 없습니다.
            </div>
          ) : (
            pendingClubApplications.map((application) => (
              <ApplicationTableRow
                key={application.applicationId}
                applicationId={application.applicationId}
                clubName={application.clubName}
                applicantName={application.applicantName}
                category={application.category}
                status={application.status}
                createdAt={application.createdAt}
                onApprove={handleCombinedApprove}
                onReject={handleCombinedReject}
              />
            ))
          )}
        </div>
      )}

      {activeTab === 'masterOnly' && (
        <div className="flex w-full flex-col">
          <div className="flex w-full items-center border-t border-b border-[#8B95A1] py-2">
            <span className="w-[120px] text-[16px] leading-[140%] font-medium text-[#000000]">
              신청일자
            </span>
            <span className="w-[160px] text-[16px] leading-[140%] font-medium text-[#000000]">
              동아리명
            </span>
            <span className="flex-1 text-[16px] leading-[140%] font-medium text-[#000000]">
              신청자
            </span>
            <span className="w-[152px] text-[16px] leading-[140%] font-medium text-[#000000]">
              상태
            </span>
          </div>
          {pendingMasterApplications.length === 0 ? (
            <div className="py-8 text-center text-[16px] leading-[140%] font-medium text-[#8B95A1]">
              신청 내역이 없습니다.
            </div>
          ) : (
            pendingMasterApplications.map((application) => (
              <ApplicationTableRow
                key={application.applicationId}
                applicationId={application.applicationId}
                clubName={application.clubName}
                applicantName={application.applicantName}
                status={application.status}
                createdAt={application.createdAt}
                onApprove={handleMasterApprove}
                onReject={handleMasterReject}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default ClubMasterApplicationWidget;
