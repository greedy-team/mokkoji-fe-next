import { notFound } from 'next/navigation';
import getClubDetail from '@/views/club/api/getClubDetail';
import ClubDetailCommentWidget from '@/widgets/club-detail/ui/club-detail-comment-widget';
import ClubDetailHeader from '@/entities/club/ui/club-detail-header';
import convertLinkText from '@/entities/recruit-detail/util/convetLinkText';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import { DetailParams } from '@/shared/model/type';
import ClubDetailTabs from '@/entities/club/ui/club-detail-tabs';
import { Description } from '@radix-ui/react-dialog';

async function ClubDetailPage({ params }: DetailParams) {
  const { id } = await params;
  const data = await getClubDetail(Number(id));

  if (data?.status === 404 || !data.data) {
    notFound();
  }

  if (!data.ok) {
    return <ErrorBoundaryUi />;
  }

  return (
    <div className="mt-20 mb-10 max-w-[95%] min-w-[95%] lg:max-w-[85%] lg:min-w-[75%]">
      <ClubDetailHeader
        title={data.data.name}
        category={data.data.category}
        startDate={data.data.recruitStartDate}
        endDate={data.data.recruitEndDate}
        instagram={data.data.instagram}
        clubId={Number(id)}
        isFavorite={data.data.isFavorite}
        logo={data.data.logo}
        status={data.data.status}
      />
      <ClubDetailTabs clubId={Number(id)} description={data.data.description} />
      {/* <ClubDetailCommentWidget clubId={Number(id)} /> */}
    </div>
  );
}

export default ClubDetailPage;
