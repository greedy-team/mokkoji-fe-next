import { notFound } from 'next/navigation';
import getClubDetail from '@/views/club/api/getClubDetail';
import ClubDetailHeader from '@/entities/club/ui/club-detail-header';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import { DetailParams } from '@/shared/model/type';
import ClubDetailTabs from '@/entities/club/ui/club-detail-tabs';
import getClubDetailComments from '@/widgets/club-detail/api/getClubDetailComments';
import getRecruitDetail from '@/views/recruit/api/getRecruitDetail';

async function ClubDetailPage({ params }: DetailParams) {
  const { id } = await params;

  const [recruitdata, detaildata, commentsdata] = await Promise.all([
    getRecruitDetail(Number(id)),
    getClubDetail(Number(id)),
    getClubDetailComments(Number(id)),
  ]);

  if (detaildata?.status === 404 || !detaildata.data) {
    notFound();
  }

  if (!detaildata.ok) {
    return <ErrorBoundaryUi />;
  }

  return (
    <div className="mt-20 mb-10 max-w-[95%] min-w-[95%] lg:max-w-[85%] lg:min-w-[75%]">
      <ClubDetailHeader
        title={detaildata.data.name}
        category={detaildata.data.category}
        startDate={detaildata.data.recruitStartDate}
        endDate={detaildata.data.recruitEndDate}
        instagram={detaildata.data.instagram}
        clubId={Number(id)}
        isFavorite={detaildata.data.isFavorite}
        logo={detaildata.data.logo}
        status={recruitdata.data?.status || 'CLOSED'}
      />

      <ClubDetailTabs
        recruitData={recruitdata.data}
        description={detaildata.data.description}
        clubId={Number(id)}
        comments={commentsdata.data?.comments ?? []}
      />
    </div>
  );
}

export default ClubDetailPage;
