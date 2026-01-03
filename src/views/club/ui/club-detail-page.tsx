import { notFound } from 'next/navigation';
import RecruitDetailHeader from '@/entities/club-detail/ui/recruit-detail-header';
import getClubManageInfo from '@/shared/api/manage-api';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import { auth } from '@/auth';
import ClubDetailTabs from '@/entities/club-detail/ui/club-detail-tabs';
import getRecentRecruitDetail from '@/views/club/api/getRecentRecruitDetail';
import getClubRecruitments from '../api/getClubRecruitments';

interface ClubDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab: string }>;
}

async function ClubDetailPage({ params, searchParams }: ClubDetailPageProps) {
  const { id } = await params;
  const tab = (await searchParams).tab || 'recruit';

  const session = await auth();
  const role = session?.role;
  const [getClubManageInfoRes, data, recruitHistories] = await Promise.all([
    getClubManageInfo({ role }),
    getRecentRecruitDetail(Number(id)),
    getClubRecruitments(Number(id)),
  ]);

  if (data?.status === 404 || !data.data) {
    notFound();
  }

  if (!data.ok) {
    return <ErrorBoundaryUi />;
  }

  const historiesArray = recruitHistories.ok
    ? (recruitHistories.data?.recruitments ?? [])
    : [];

  const isManageClub =
    getClubManageInfoRes?.data?.clubs.some(
      (club) => club.clubId === data.data?.clubId,
    ) || false;

  return (
    <div className="mt-20 mb-10 w-[80%] lg:max-w-[85%] lg:min-w-[75%]">
      <RecruitDetailHeader
        title={data.data.clubName}
        category={data.data.category}
        startDate={data.data.recruitStart}
        endDate={data.data.recruitEnd}
        instagram={data.data.instagramUrl}
        clubId={Number(id)}
        isFavorite={data.data.isFavorite}
        createdAt={data.data.createdAt}
        logo={data.data.logo}
        status={data.data.status}
      />

      <ClubDetailTabs
        activeTab={tab}
        isManageClub={isManageClub}
        recruitData={data.data}
        recruitHistories={historiesArray}
        id={Number(id)}
      />
    </div>
  );
}

export default ClubDetailPage;
