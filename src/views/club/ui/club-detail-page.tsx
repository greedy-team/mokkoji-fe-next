import ClubDetailHeader from '@/entities/club/ui/club-detail-header';
import getClubDetail from '@/views/club/api/getClubDetail';
import convertLinkText from '@/entities/club/ui/util/convetLinkText';

async function ClubDetailPage({ params }: { params: { id: Promise<string> } }) {
  const data = await getClubDetail(await params.id);

  return (
    <main>
      <ClubDetailHeader
        title={data.name}
        category={data.category}
        startDate={data.recruitStartDate}
        endDate={data.recruitEndDate}
        instagramLink={data.instagramLink}
      />
      <p
        dangerouslySetInnerHTML={{ __html: convertLinkText(data.recruitPost) }}
        className="mb-5 w-[95%] text-[0.8rem] leading-[1.4] whitespace-pre-wrap text-black max-[770px]:w-[90%]"
      />
    </main>
  );
}

export default ClubDetailPage;
