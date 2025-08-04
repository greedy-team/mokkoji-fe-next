import getClubDetail from '@/views/club/api/getClubDetail';
import convertLinkText from '@/entities/recruit-detail/util/convetLinkText';
import ClubDetailHeaderControl from '@/features/recruit-detail/ui/club-detail-header-control';
import { ClubDetailParams } from '@/views/club/model/type';

// TODO: 추후 프롭스 드릴링 해결 필요
async function ClubDetailPage({ params }: ClubDetailParams) {
  const { id } = await params;
  const data = await getClubDetail(id);

  return (
    <main>
      <ClubDetailHeaderControl
        instagram={data.instagram}
        clubId={Number(id)}
        isFavorite={data.isFavorite}
      />
      <p
        dangerouslySetInnerHTML={{ __html: convertLinkText(data.recruitPost) }}
        className="mb-5 w-[95%] text-[0.8rem] leading-[1.4] whitespace-pre-wrap text-black max-[770px]:w-[90%]"
      />
    </main>
  );
}

export default ClubDetailPage;
