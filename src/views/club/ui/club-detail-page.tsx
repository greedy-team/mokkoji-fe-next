import getClubDetail from '@/views/club/api/getClubDetail';
import convertLinkText from '@/entities/recruit-detail/util/convetLinkText';
import ClubDetailHeaderControl from '@/features/recruit-detail/ui/club-detail-header-control';

// TODO: 추후 프롭스 드릴링 해결 필요
async function ClubDetailPage({ params }: { params: { id: Promise<string> } }) {
  const data = await getClubDetail(await params.id);

  return (
    <main>
      <ClubDetailHeaderControl
        instagramLink={data.instagramLink}
        clubId={Number(params.id)}
      />
      <p
        dangerouslySetInnerHTML={{ __html: convertLinkText(data.recruitPost) }}
        className="mb-5 w-[95%] text-[0.8rem] leading-[1.4] whitespace-pre-wrap text-black max-[770px]:w-[90%]"
      />
    </main>
  );
}

export default ClubDetailPage;
