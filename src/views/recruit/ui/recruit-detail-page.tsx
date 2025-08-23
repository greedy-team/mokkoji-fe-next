import getRecruitDetail from '@/views/recruit/api/getRecruitDetail';
import { DetailParams } from '@/shared/model/type';
import getParams from '@/shared/util/getParams';
import RecruitDetailHeader from '@/entities/recruit-detail/ui/recruit-detail-header';
import { auth } from '@/auth';
import ClubDetailMergeWidget from '@/widgets/club/ui/club-detail-merge-widget';
import getClubDetail from '@/views/club/api/getClubDetail';
import getClubDetailComments from '@/widgets/club-detail/api/getClubDetailComments';

async function RecruitDetailPage({ params }: DetailParams) {
  const session = await auth();
  const { id } = await getParams({ params });
  const data = await getRecruitDetail(id);
  const clubData = await getClubDetail(id);
  const commentData = await getClubDetailComments(Number(id));

  const isManageClub = session?.manageClubInfo?.some(
    (club) => club.clubId === data.clubId,
  );

  return (
    <div className="mt-10 mb-10 max-w-[95%] min-w-[95%] lg:mt-20 lg:max-w-[85%] lg:min-w-[75%]">
      <RecruitDetailHeader
        title={clubData.name}
        category={clubData.category}
        startDate={clubData.recruitStartDate}
        endDate={clubData.recruitEndDate}
        instagram={clubData.instagram}
        clubId={Number(id)}
        isFavorite={clubData.isFavorite}
        createdAt={data.createdAt}
        logo={clubData.logo}
        status={clubData.status}
      />
      <ClubDetailMergeWidget
        isManageClub={isManageClub}
        data={data}
        clubId={Number(id)}
        clubData={clubData}
        commentData={commentData}
      />
    </div>
  );
}

export default RecruitDetailPage;
