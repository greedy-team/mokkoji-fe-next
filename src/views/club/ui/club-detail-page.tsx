import RecruitDetailHeader from '@/widgets/club-detail/ui/recruit-detail-header';
import RecruitHistorySection from '@/entities/club-detail/ui/recruit-history-section';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import ClubDetailTabs from '@/widgets/club-detail/ui/club-detail-tabs';
import ScrollProgressBar from '@/shared/ui/scroll-progress-bar';
import GoogleAdSense from '@/shared/ui/GoogleAdSense';
import type { RecruitmentDetail } from '@/entities/club-detail/model/type';
import getClubRecruitments from '../api/getClubRecruitments';
import getRecruitDetail from '../api/getRecruitDetail';

interface ClubDetailPageProps {
  id: number;
  universityCode: string;
  tab: string;
  recruit?: string;
  recent: RecruitmentDetail;
}

async function ClubDetailPage({
  id,
  universityCode,
  tab,
  recruit,
  recent,
}: ClubDetailPageProps) {
  const recruitHistoriesResult = await getClubRecruitments(id);

  const recruitmentId = Number(recruit) || recent.id;
  const selected = await getRecruitDetail(recruitmentId, id);

  const historySlot = !recruitHistoriesResult.ok ? (
    <ErrorBoundaryUi message="모집 이력을 불러오지 못했습니다." />
  ) : (
    <RecruitHistorySection
      clubId={id}
      recruitHistories={recruitHistoriesResult.data?.recruitments ?? []}
      selectedRecruitId={recruitmentId}
    />
  );

  return (
    <>
      <ScrollProgressBar />
      <div className="mt-5 w-full lg:mt-[35px]">
        <RecruitDetailHeader
          title={recent.clubName}
          category={recent.category}
          startDate={recent.recruitStart}
          endDate={recent.recruitEnd}
          instagram={recent.instagramUrl}
          clubId={id}
          isFavorite={recent.isFavorite}
          createdAt={recent.createdAt}
          logo={recent.logo}
          status={recent.status}
          isAlwaysRecruiting={recent.isAlwaysRecruiting}
        />

        <ClubDetailTabs
          activeTab={tab}
          recruitData={selected.ok ? selected.data : undefined}
          clubId={id}
          selectedRecruitmentId={recruitmentId}
          universityCode={universityCode}
          historySlot={historySlot}
        />
        <GoogleAdSense slotName="clubContentBottom" />
      </div>
    </>
  );
}

export default ClubDetailPage;
