import getRecruitDetail from '@/views/recruit/api/getRecruitDetail';

import { DetailParams } from '@/shared/model/type';
import getParams from '@/shared/util/getParams';
import RecruitDetailHeader from '@/entities/recruit-detail/ui/recruit-detail-header';
import { auth } from '@/auth';
import RecruitDetailWidget from '@/widgets/recruit-detail/ui/recruit-detail-widget';

async function RecruitDetailPage({ params }: DetailParams) {
  const session = await auth();
  const { id } = await getParams({ params });
  const data = await getRecruitDetail(id);

  const isManageClub = session?.manageClubInfo?.some(
    (club) => club.clubId === data.clubId,
  );

  return (
    <div className="mt-20 mb-10 max-w-[95%] min-w-[95%] lg:max-w-[85%] lg:min-w-[75%]">
      <RecruitDetailHeader
        title={data.clubName}
        category={data.category}
        startDate={data.recruitStart}
        endDate={data.recruitEnd}
        instagram={data.instagram}
        clubId={Number(id)}
        isFavorite={data.isFavorite}
        createdAt={data.createdAt}
        logo={data.logo}
      />
      <RecruitDetailWidget
        isManageClub={isManageClub}
        title={data.title}
        content={data.content}
        recruitForm={data.recruitForm}
        imageUrls={data.imageUrls}
        recruitStart={data.recruitStart}
        recruitEnd={data.recruitEnd}
        clubId={Number(id)}
      />
    </div>
  );
}

export default RecruitDetailPage;
