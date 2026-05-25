'use client';

import { useState, useTransition } from 'react';
import type {
  ClubMasterApplication,
  ClubApplication,
  ApplicationStatus,
} from '@/features/admin/model/dashboard-types';
import ApplicationTableRow from '@/features/admin/ui/ApplicationTableRow';
import SubTabButton from '@/features/admin/ui/SubTabButton';
import TableHeaderCell from '@/features/admin/ui/TableHeaderCell';
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
      const [clubSuccess, masterSuccess] = await Promise.all([
        approveClubApplication(applicationId),
        approveClubMasterApplication(applicationId),
      ]);
      if (clubSuccess && masterSuccess) {
        setClubApplications((previous) =>
          previous.map((a) =>
            a.applicationId === applicationId
              ? { ...a, status: 'APPROVED' as ApplicationStatus }
              : a,
          ),
        );
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
        <SubTabButton
          isActive={activeTab === 'combined'}
          onClick={() => setActiveTab('combined')}
        >
          동아리장 &amp; 동아리 생성
        </SubTabButton>
        <SubTabButton
          isActive={activeTab === 'masterOnly'}
          onClick={() => setActiveTab('masterOnly')}
        >
          동아리장
        </SubTabButton>
      </div>

      {activeTab === 'combined' && (
        <div className="flex w-full flex-col">
          <div className="flex w-full items-center border-t border-b border-[#8B95A1] py-2">
            <TableHeaderCell width="w-[120px]">신청일자</TableHeaderCell>
            <TableHeaderCell width="w-[160px]">동아리명</TableHeaderCell>
            <TableHeaderCell width="w-[100px]">분류</TableHeaderCell>
            <TableHeaderCell width="flex-1">신청자</TableHeaderCell>
            <TableHeaderCell width="w-[152px]">상태</TableHeaderCell>
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
            <TableHeaderCell width="w-[120px]">신청일자</TableHeaderCell>
            <TableHeaderCell width="w-[160px]">동아리명</TableHeaderCell>
            <TableHeaderCell width="flex-1">신청자</TableHeaderCell>
            <TableHeaderCell width="w-[152px]">상태</TableHeaderCell>
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
