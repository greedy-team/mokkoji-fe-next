import { notFound } from 'next/navigation';
import getRecruitDetail from '@/views/recruit/api/getRecruitDetail';
import RecruitDetailHeader from '@/entities/recruit-detail/ui/recruit-detail-header';
import getClubManageInfo from '@/shared/api/manage-api';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import { auth } from '@/auth';
import ClubDetailTabs from '@/entities/club/ui/club-detail-tabs';

interface RecruitDetailPageProps {
  params: { id: string };
  searchParams: { tab?: string };
}

async function RecruitDetailPage({
  params,
  searchParams,
}: RecruitDetailPageProps) {
  const { id } = await params;
  const tab = searchParams.tab || 'recruit';

  const session = await auth();
  const role = session?.role;
  const [getClubManageInfoRes, data] = await Promise.all([
    getClubManageInfo({ role }),
    getRecruitDetail(Number(id)),
  ]);

  if (data?.status === 404 || !data.data) {
    notFound();
  }

  if (!data.ok) {
    return <ErrorBoundaryUi />;
  }

  const isManageClub =
    getClubManageInfoRes?.data?.clubs.some(
      (club) => club.clubId === data.data?.clubId,
    ) || false;

  return (
    <div className="mt-20 mb-10 max-w-[95%] min-w-[95%] lg:max-w-[85%] lg:min-w-[75%]">
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
        id={Number(id)}
      />
    </div>
  );
}

export default RecruitDetailPage;
