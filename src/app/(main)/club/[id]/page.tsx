import ClubDetailPage from '@/views/club/ui/club-detail-page';
import { DetailParams } from '@/shared/model/type';

function Page({ params }: DetailParams) {
  return <ClubDetailPage params={params} />;
}

export default Page;
