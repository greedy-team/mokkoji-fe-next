import { DetailParams } from '@/shared/model/type';
import ClubEditPage from '@/views/club-register/ui/club-edit-page';

async function Page({ params }: DetailParams) {
  return <ClubEditPage params={params} />;
}

export default Page;
