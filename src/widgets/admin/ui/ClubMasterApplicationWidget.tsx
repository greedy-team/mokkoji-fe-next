'use client';

import { useMemo, useState, useTransition } from 'react';
import { toast } from 'react-toastify';
import type {
  ClubMasterApplication,
  ClubApplication,
  ApplicationStatus,
  ApplicationCardItem,
} from '@/features/admin/model/dashboard-types';
import ApplicationCard from '@/features/admin/ui/ApplicationCard';
import SubTabButton from '@/features/admin/ui/SubTabButton';
import approveClubMasterApplication from '@/features/admin/api/approveClubMasterApplication';
import rejectClubMasterApplication from '@/features/admin/api/rejectClubMasterApplication';
import approveClubApplication from '@/features/admin/api/approveClubApplication';
import rejectClubApplication from '@/features/admin/api/rejectClubApplication';

type KindFilter = 'clubApplication' | 'clubMaster';

const STATUS_TABS: { label: string; value: ApplicationStatus }[] = [
  { label: '진행 중', value: 'PENDING' },
  { label: '승인', value: 'APPROVED' },
  { label: '반려', value: 'REJECTED' },
];

interface ClubMasterApplicationWidgetProps {
  initialClubApplications: ClubApplication[];
  initialClubMasterApplications: ClubMasterApplication[];
}

function ClubMasterApplicationWidget({
  initialClubApplications,
  initialClubMasterApplications,
}: ClubMasterApplicationWidgetProps) {
  const [kindFilter, setKindFilter] = useState<KindFilter>('clubApplication');
  const [statusTab, setStatusTab] = useState<ApplicationStatus>('PENDING');
  const [clubApplications, setClubApplications] = useState(
    initialClubApplications,
  );
  const [clubMasterApplications, setClubMasterApplications] = useState(
    initialClubMasterApplications,
  );
  const [, startTransition] = useTransition();

  const items = useMemo<ApplicationCardItem[]>(() => {
    if (kindFilter === 'clubMaster') {
      return clubMasterApplications.map((application) => ({
        key: `master-${application.id}`,
        kind: 'master',
        applicationId: application.id,
        clubName: application.clubName,
        universityName: application.universityName,
        applicantName: application.userName,
        status: application.status,
        rejectReason: application.rejectReason,
        createdAt: application.createdAt,
      }));
    }

    return clubApplications.map((application) => ({
      key: `club-${application.applicationId}`,
      kind: 'club',
      applicationId: application.applicationId,
      clubName: application.clubName,
      universityName: application.universityName,
      applicantName: application.applicantName,
      status: application.status,
      rejectReason: application.rejectReason,
      createdAt: application.createdAt,
      category: application.category,
      affiliation: application.affiliation,
      logo: application.logo,
      instagram: application.instagram,
      description: application.description,
    }));
  }, [clubApplications, clubMasterApplications, kindFilter]);

  const visibleItems = items.filter((item) => item.status === statusTab);

  const updateStatus = (
    item: ApplicationCardItem,
    status: ApplicationStatus,
    rejectReason: string | null = null,
  ) => {
    if (item.kind === 'club') {
      setClubApplications((previous) =>
        previous.map((application) =>
          application.applicationId === item.applicationId
            ? { ...application, status, rejectReason }
            : application,
        ),
      );
    } else {
      setClubMasterApplications((previous) =>
        previous.map((application) =>
          application.id === item.applicationId
            ? { ...application, status, rejectReason }
            : application,
        ),
      );
    }
  };

  const handleApprove = (item: ApplicationCardItem) => {
    startTransition(async () => {
      const result =
        item.kind === 'club'
          ? await approveClubApplication(item.applicationId)
          : await approveClubMasterApplication(item.applicationId);

      if (!result.ok) {
        toast.error(result.message);
        return;
      }

      updateStatus(item, 'APPROVED');
      toast.success(result.message);
    });
  };

  const handleReject = (item: ApplicationCardItem, rejectReason?: string) => {
    startTransition(async () => {
      const result =
        item.kind === 'club'
          ? await rejectClubApplication(item.applicationId, rejectReason)
          : await rejectClubMasterApplication(item.applicationId, rejectReason);

      if (!result.ok) {
        toast.error(result.message);
        return;
      }

      updateStatus(item, 'REJECTED', rejectReason ?? null);
      toast.success(result.message);
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-3">
        <SubTabButton
          isActive={kindFilter === 'clubApplication'}
          onClick={() => setKindFilter('clubApplication')}
        >
          동아리 생성 &amp; 동아리장
        </SubTabButton>
        <SubTabButton
          isActive={kindFilter === 'clubMaster'}
          onClick={() => setKindFilter('clubMaster')}
        >
          동아리장
        </SubTabButton>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setStatusTab(tab.value)}
              className="flex w-20 cursor-pointer flex-col items-center gap-[5px]"
            >
              <span
                className={`text-[16px] leading-[140%] font-semibold tracking-[-0.03em] ${statusTab === tab.value ? 'text-[#22CF64]' : 'text-[#8B95A1]'}`}
              >
                {tab.label}
              </span>
              <span
                className={`h-px w-full ${statusTab === tab.value ? 'bg-[#22CF64]' : 'bg-transparent'}`}
              />
            </button>
          ))}
        </div>

        <div className="flex w-full flex-col">
          {visibleItems.length === 0 ? (
            <div className="py-8 text-center text-[16px] leading-[140%] font-medium text-[#8B95A1]">
              신청 내역이 없습니다.
            </div>
          ) : (
            visibleItems.map((item) => (
              <ApplicationCard
                key={item.key}
                item={item}
                onApprove={() => handleApprove(item)}
                onReject={(rejectReason) => handleReject(item, rejectReason)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ClubMasterApplicationWidget;
