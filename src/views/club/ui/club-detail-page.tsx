import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import RecruitDetailHeader from '@/entities/club-detail/ui/recruit-detail-header';
import RecruitHistorySection from '@/entities/club-detail/ui/recruit-history-section';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import ClubDetailTabs from '@/widgets/club-detail/ui/club-detail-tabs';
import getRecentRecruitDetail from '@/views/club/api/getRecentRecruitDetail';
import ScrollProgressBar from '@/shared/ui/scroll-progress-bar';
import GoogleAdSense from '@/shared/ui/GoogleAdSense';
import stripHtmlTags from '@/shared/lib/stripHtmlTags';
import getClubDetail from '@/entities/club-detail/api/getClubDetail';
import getClubRecruitments from '../api/getClubRecruitments';
import getRecruitDetail from '../api/getRecruitDetail';

interface ClubDetailPageProps {
  params: Promise<{ id: string; universityCode: string }>;
  searchParams: Promise<{ tab?: string; recruit?: string }>;
}

async function ClubDetailPage({ params, searchParams }: ClubDetailPageProps) {
  const { id, universityCode } = await params;
  const { tab, recruit } = await searchParams;

  const [clubResult, recentResult, recruitHistoriesResult] =
    await Promise.allSettled([
      getClubDetail(Number(id)),
      getRecentRecruitDetail(Number(id)),
      getClubRecruitments(Number(id)),
    ]);

  if (clubResult.status === 'rejected') return <ErrorBoundaryUi />;
  if (clubResult.value.status === 404) notFound();
  if (!clubResult.value.ok || !clubResult.value.data)
    return <ErrorBoundaryUi />;
  const club = clubResult.value.data;

  if (recentResult.status === 'rejected') return <ErrorBoundaryUi />;
  const recent = recentResult.value;

  if (!recent.ok && recent.status !== 404) return <ErrorBoundaryUi />;
  const recentRecruitment = recent.ok ? recent.data : undefined;
  const requestedRecruitmentId = Number(recruit);
  const recruitmentId =
    Number.isSafeInteger(requestedRecruitmentId) && requestedRecruitmentId > 0
      ? requestedRecruitmentId
      : recentRecruitment?.id;
  const defaultTab = recruitmentId ? 'recruit' : 'about';
  const activeTab =
    tab === 'recruit' || tab === 'about' || tab === 'comments'
      ? tab
      : defaultTab;

  const selected =
    activeTab === 'recruit' && recruitmentId
      ? await getRecruitDetail(recruitmentId, Number(id))
      : undefined;
  if (selected && (!selected.ok || !selected.data)) return <ErrorBoundaryUi />;
  const recruitData = selected?.data;
  const hasVisibleContent =
    (activeTab === 'about' && Boolean(stripHtmlTags(club.description))) ||
    (activeTab === 'recruit' && Boolean(stripHtmlTags(recruitData?.content)));

  let historySlot: ReactNode;
  if (recruitmentId) {
    historySlot =
      recruitHistoriesResult.status === 'rejected' ||
      !recruitHistoriesResult.value.ok ? (
        <ErrorBoundaryUi message="모집 이력을 불러오지 못했습니다." />
      ) : (
        <RecruitHistorySection
          clubId={Number(id)}
          recruitHistories={
            recruitHistoriesResult.value.data?.recruitments ?? []
          }
          selectedRecruitId={recruitmentId}
        />
      );
  }

  return (
    <>
      <ScrollProgressBar />
      <div className="mt-5 w-full lg:mt-[35px]">
        <RecruitDetailHeader
          title={club.name}
          category={club.category}
          startDate={recentRecruitment?.recruitStart}
          endDate={recentRecruitment?.recruitEnd}
          instagram={club.instagram}
          clubId={Number(id)}
          isFavorite={club.isFavorite}
          createdAt={recentRecruitment?.createdAt}
          logo={club.logo}
          status={recentRecruitment?.status}
          isAlwaysRecruiting={recentRecruitment?.isAlwaysRecruiting ?? false}
          hasRecruitment={Boolean(recentRecruitment)}
        />

        <ClubDetailTabs
          activeTab={activeTab}
          recruitData={recruitData}
          description={club.description}
          clubId={Number(id)}
          selectedRecruitmentId={recruitmentId}
          universityCode={universityCode}
          historySlot={historySlot}
        />
        {hasVisibleContent && <GoogleAdSense slotName="clubContentBottom" />}
      </div>
    </>
  );
}

export default ClubDetailPage;
