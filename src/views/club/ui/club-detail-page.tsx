import { notFound } from 'next/navigation';
import RecruitDetailHeader from '@/entities/club-detail/ui/recruit-detail-header';
import RecruitHistorySection from '@/entities/club-detail/ui/recruit-history-section';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import ClubDetailTabs from '@/widgets/club-detail/ui/club-detail-tabs';
import getRecentRecruitDetail from '@/views/club/api/getRecentRecruitDetail';
import ScrollProgressBar from '@/shared/ui/scroll-progress-bar';
import getClubRecruitments from '../api/getClubRecruitments';
import getRecruitDetail from '../api/getRecruitDetail';

interface ClubDetailPageProps {
  params: Promise<{ id: string; universityCode: string }>;
  searchParams: Promise<{ tab?: string; recruit?: string }>;
}

async function ClubDetailPage({ params, searchParams }: ClubDetailPageProps) {
  const { id, universityCode } = await params;
  const { tab = 'recruit', recruit } = await searchParams;

  const [recentResult, recruitHistoriesResult] = await Promise.allSettled([
    getRecentRecruitDetail(Number(id)),
    getClubRecruitments(Number(id)),
  ]);

  if (recentResult.status === 'rejected') return <ErrorBoundaryUi />;
  const recent = recentResult.value;

  if (recent?.status === 404 || !recent.data) notFound();
  if (!recent.ok) return <ErrorBoundaryUi />;

  const recruitmentId = Number(recruit) || recent.data.id;
  const selected = await getRecruitDetail(recruitmentId);

  const historySlot =
    recruitHistoriesResult.status === 'rejected' ||
    !recruitHistoriesResult.value.ok ? (
      <ErrorBoundaryUi message="모집 이력을 불러오지 못했습니다." />
    ) : (
      <RecruitHistorySection
        clubId={Number(id)}
        recruitHistories={recruitHistoriesResult.value.data?.recruitments ?? []}
        selectedRecruitId={recruitmentId}
      />
    );

  return (
    <>
      <ScrollProgressBar />
      <div className="mt-5 w-full lg:mt-[35px]">
        <RecruitDetailHeader
          title={recent.data.clubName}
          category={recent.data.category}
          startDate={recent.data.recruitStart}
          endDate={recent.data.recruitEnd}
          instagram={recent.data.instagramUrl}
          clubId={Number(id)}
          isFavorite={recent.data.isFavorite}
          createdAt={recent.data.createdAt}
          logo={recent.data.logo}
          status={recent.data.status}
          isAlwaysRecruiting={recent.data.isAlwaysRecruiting}
        />

        <ClubDetailTabs
          activeTab={tab}
          recruitData={selected.ok ? selected.data : undefined}
          clubId={Number(id)}
          selectedRecruitmentId={recruitmentId}
          universityCode={universityCode}
          historySlot={historySlot}
        />
      </div>
    </>
  );
}

export default ClubDetailPage;
