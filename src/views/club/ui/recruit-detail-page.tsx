import RecruitDetailHeader from '@/entities/recruit/lib/ui/recruit-detail-header';
import getClubDetail from '@/views/club/api/getClubDetail';
import convertLinkText from '@/entities/recruit/lib/util/convetLinkText';
import RecruitDetailCommentWidget from '@/widgets/recruit-detail/ui/recruit-detail-comment-widget';

async function RecruitDetailPage({
  params,
}: {
  params: { id: Promise<string> };
}) {
  const data = await getClubDetail(await params.id);

  return (
    <main>
      <RecruitDetailHeader
        title={data.name}
        category={data.category}
        startDate={data.recruitStartDate}
        endDate={data.recruitEndDate}
        instagramLink={data.instagramLink}
        clubId={Number(params.id)}
      />
      <p
        dangerouslySetInnerHTML={{ __html: convertLinkText(data.recruitPost) }}
        className="mb-5 w-[95%] text-[1rem] leading-[1.4] whitespace-pre-wrap text-black max-[770px]:w-[90%]"
      />
      <RecruitDetailCommentWidget clubId={Number(params.id)} />
    </main>
  );
}

export default RecruitDetailPage;
