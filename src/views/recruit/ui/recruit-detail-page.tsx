import convertLinkText from '@/entities/recruit-detail/util/convetLinkText';
import getRecruitDetail from '@/views/recruit/api/getRecruitDetail';

import { DetailParams } from '@/shared/model/type';
import getParams from '@/shared/util/getParams';
import RecruitDetailHeader from '@/entities/recruit-detail/ui/recruit-detail-header';

async function RecruitDetailPage({ params }: DetailParams) {
  const { id } = await getParams({ params });
  const data = await getRecruitDetail(id);

  return (
    <>
      <RecruitDetailHeader
        title={data.clubName}
        category={data.category}
        instagram={data.instagram}
        clubId={Number(id)}
        isFavorite={data.isFavorite}
      />
      <p
        dangerouslySetInnerHTML={{ __html: convertLinkText(data.content) }}
        className="mb-3 max-w-4xl text-xs leading-[1.4] whitespace-pre-wrap text-black"
      />
    </>
  );
}

export default RecruitDetailPage;
