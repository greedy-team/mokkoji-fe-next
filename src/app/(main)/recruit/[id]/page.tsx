import RecruitDetailPage from '@/views/recruit/ui/recruit-detail-page';
import { DetailParams } from '@/shared/model/type';

function Page({ params }: DetailParams) {
  return <RecruitDetailPage params={params} />;
}

export default Page;
