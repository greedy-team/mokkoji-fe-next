import { notFound } from 'next/navigation';
import getClubDetail from '@/views/club/api/getClubDetail';
import ClubDetailCommentWidget from '@/widgets/club-detail/ui/club-detail-comment-widget';
import { DetailParams } from '@/shared/model/type';
import getParams from '@/shared/util/getParams';
import ClubDetailHeader from '@/entities/club/ui/club-detail-header';
import convertLinkText from '@/entities/recruit-detail/util/convetLinkText';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';

async function ClubDetailPage({ params }: DetailParams) {
  const { id } = await getParams({ params });
  const data = await getClubDetail(id);

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
      {data.data.description ? (
        <p className="mb-3 text-sm leading-[1.4] whitespace-pre-wrap text-black lg:pt-10 lg:text-lg">
          <span
            dangerouslySetInnerHTML={{
              __html: convertLinkText(data.data.description),
            }}
          />
        </p>
      ) : (
        <p className="py-30 text-center text-gray-500">
          동아리 소개 정보가 없습니다.
        </p>
      )}
      <ClubDetailCommentWidget clubId={Number(id)} />
    </div>
  );
}

export default ClubDetailPage;
