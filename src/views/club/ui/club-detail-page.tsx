import getClubDetail from '@/views/club/api/getClubDetail';
import convertLinkText from '@/entities/recruit-detail/util/convetLinkText';
import ClubDetailCommentWidget from '@/widgets/club-detail/ui/club-detail-comment-widget';
import { DetailParams } from '@/shared/model/type';
import getParams from '@/shared/util/getParams';
import ClubDetailHeader from '@/entities/club/ui/club-detail-header';

async function ClubDetailPage({ params }: DetailParams) {
  const { id } = await getParams({ params });
  const data = await getClubDetail(id);

  return (
    <div className="max-w-[95%] min-w-[95%] lg:max-w-[85%] lg:min-w-[75%]">
      <ClubDetailHeader
        title={data.name}
        category={data.category}
        startDate={data.recruitStartDate}
        endDate={data.recruitEndDate}
        instagram={data.instagram}
        clubId={Number(id)}
        isFavorite={data.isFavorite}
      />
      <p
        dangerouslySetInnerHTML={{ __html: convertLinkText(data.recruitPost) }}
        className="mb-3 text-sm leading-[1.4] whitespace-pre-wrap text-black"
      />
      <ClubDetailCommentWidget clubId={Number(id)} />
    </div>
  );
}

export default ClubDetailPage;
