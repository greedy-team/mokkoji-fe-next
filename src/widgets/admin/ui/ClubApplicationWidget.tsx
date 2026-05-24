'use client';

import { useState, useTransition } from 'react';
import type {
  ClubApplication,
  ApplicationStatus,
} from '@/features/admin/model/dashboard-types';
import ApplicationTableRow from '@/features/admin/ui/ApplicationTableRow';
import approveClubApplication from '@/features/admin/api/approveClubApplication';
import rejectClubApplication from '@/features/admin/api/rejectClubApplication';

const STATUS_TABS: { label: string; value: ApplicationStatus }[] = [
  { label: '대기 중', value: 'PENDING' },
  { label: '승인됨', value: 'APPROVED' },
  { label: '반려됨', value: 'REJECTED' },
];

interface ClubApplicationWidgetProps {
  initialApplications: ClubApplication[];
}

function ClubApplicationWidget({
  initialApplications,
}: ClubApplicationWidgetProps) {
  const [activeStatus, setActiveStatus] =
    useState<ApplicationStatus>('PENDING');
  const [applications, setApplications] = useState(initialApplications);
  const [, startTransition] = useTransition();

  const filtered = applications.filter(
    (application) => application.status === activeStatus,
  );

  const handleApprove = (applicationId: number) => {
    startTransition(async () => {
      const success = await approveClubApplication(applicationId);
      if (success) {
        setApplications((previous) =>
          previous.map((application) =>
            application.applicationId === applicationId
              ? { ...application, status: 'APPROVED' as ApplicationStatus }
              : application,
          ),
        );
      }
    });
  };

  const handleReject = (applicationId: number, rejectReason?: string) => {
    startTransition(async () => {
      const success = await rejectClubApplication(applicationId, rejectReason);
      if (success) {
        setApplications((previous) =>
          previous.map((application) =>
            application.applicationId === applicationId
              ? {
                  ...application,
                  status: 'REJECTED' as ApplicationStatus,
                  rejectReason: rejectReason ?? null,
                }
              : application,
          ),
        );
      }
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActiveStatus(tab.value)}
            className={
              activeStatus === tab.value
                ? 'flex h-[38px] items-center justify-center rounded-[30px] bg-[#000000] px-[14px] text-[16px] leading-[140%] font-medium text-white'
                : 'flex h-[38px] items-center justify-center rounded-[30px] border border-[#D6D6D6] px-[14px] text-[16px] leading-[140%] font-medium text-[#7F7F7F]'
            }
          >
            {tab.label}
          </button>
        ))}
      </div>
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
          <span className="w-[100px] text-[16px] leading-[140%] font-medium text-[#000000]">
            소속
          </span>
          <span className="flex-1 text-[16px] leading-[140%] font-medium text-[#000000]">
            신청자
          </span>
          <span className="w-[152px] text-[16px] leading-[140%] font-medium text-[#000000]">
            상태
          </span>
        </div>
        {filtered.length === 0 ? (
          <div className="py-8 text-center text-[16px] leading-[140%] font-medium text-[#8B95A1]">
            해당 상태의 신청이 없습니다.
          </div>
        ) : (
          filtered.map((application) => (
            <ApplicationTableRow
              key={application.applicationId}
              applicationId={application.applicationId}
              clubName={application.clubName}
              applicantName={application.applicantName}
              category={application.category}
              status={application.status}
              createdAt={application.createdAt}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ClubApplicationWidget;
