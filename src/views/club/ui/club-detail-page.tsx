import getClubDetail from '@/views/club/api/getClubDetail';
import ClubDetailCommentWidget from '@/widgets/club-detail/ui/club-detail-comment-widget';
import { DetailParams } from '@/shared/model/type';
import getParams from '@/shared/util/getParams';
import ClubDetailHeader from '@/entities/club/ui/club-detail-header';
import convertLinkText from '@/entities/recruit-detail/util/convetLinkText';
import { auth } from '@/auth';

async function ClubDetailPage({ params }: DetailParams) {
  const { id } = await getParams({ params });
  const data = await getClubDetail(id);
  const session = await auth();

  return (
    <div className="mt-20 mb-10 max-w-[95%] min-w-[95%] lg:max-w-[85%] lg:min-w-[75%]">
      <ClubDetailHeader
        title={data.name}
        category={data.category}
        startDate={data.recruitStartDate}
        endDate={data.recruitEndDate}
        instagram={data.instagram}
        clubId={Number(id)}
        isFavorite={data.isFavorite}
        logo={data.logo}
        status={data.status}
        session={session || undefined}
      />
      <p className="mb-3 text-sm leading-[1.4] whitespace-pre-wrap text-black lg:pt-10 lg:text-lg">
        <span
          dangerouslySetInnerHTML={{
            __html: convertLinkText(data.description),
          }}
        />
      </p>
      <ClubDetailCommentWidget clubId={Number(id)} />
    </div>
  );
}

export default ClubDetailPage;
