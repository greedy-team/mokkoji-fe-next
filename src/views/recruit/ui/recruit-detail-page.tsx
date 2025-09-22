import getRecruitDetail from '@/views/recruit/api/getRecruitDetail';
import { DetailParams } from '@/shared/model/type';
import getParams from '@/shared/util/getParams';
import RecruitDetailHeader from '@/entities/recruit-detail/ui/recruit-detail-header';
import RecruitDetailWidget from '@/widgets/recruit-detail/ui/recruit-detail-widget';
import getClubManageInfo from '@/shared/api/manage-api';
import { auth } from '@/auth';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import NotFound from '@/app/not-found';

async function RecruitDetailPage({ params }: DetailParams) {
  const { id } = await getParams({ params });

  const [getClubManageInfoRes, data, session] = await Promise.all([
    getClubManageInfo(),
    getRecruitDetail(id),
    auth(),
  ]);

  if (data.status === 404) {
    return <NotFound />;
  }

  if (!data.ok || !data.data) {
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
        session={session || undefined}
      />
      <RecruitDetailWidget
        isManageClub={isManageClub}
        title={data.data.title}
        clubName={data.data.clubName}
        category={data.data.category}
        content={data.data.content}
        recruitForm={data.data.recruitForm}
        imageUrls={data.data.imageUrls}
        recruitStart={data.data.recruitStart}
        recruitEnd={data.data.recruitEnd}
        clubId={Number(id)}
      />
    </div>
  );
}

export default RecruitDetailPage;
