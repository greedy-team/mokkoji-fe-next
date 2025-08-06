import RecruitDetailHeader from '@/entities/recruit-detail/ui/recruit-detail-header';
import getClubDetail from '@/views/club/api/getClubDetail';
import convertLinkText from '@/entities/recruit-detail/util/convetLinkText';
import RecruitDetailCommentWidget from '@/widgets/recruit-detail/ui/recruit-detail-comment-widget';
import { DetailParams } from '@/shared/model/type';
import getParams from '@/shared/util/getParams';

async function ClubDetailPage({ params }: DetailParams) {
  const { id } = await getParams({ params });
  const data = await getClubDetail(id);
  console.log('detailData', data);
  return (
    <>
      <RecruitDetailHeader
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
        className="mb-3 max-w-4xl text-xs leading-[1.4] whitespace-pre-wrap text-black"
      />
      <RecruitDetailCommentWidget clubId={Number(id)} />
    </>
  );
}

export default ClubDetailPage;
