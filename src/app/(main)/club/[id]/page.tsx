import { DetailParams } from '@/shared/model/type';
import RecruitDetailPage from '@/views/recruit/ui/recruit-detail-page';

function Page({ params }: DetailParams) {
  return <RecruitDetailPage params={params} />;
}

export default Page;
