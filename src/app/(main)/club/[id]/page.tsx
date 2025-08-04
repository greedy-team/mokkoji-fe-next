import RecruitDetailPage from '@/views/club/ui/recruit-detail-page';
import { DetailParams } from '@/shared/model/type';

function Page({ params }: DetailParams) {
  return <RecruitDetailPage params={params} />;
}

export default Page;
