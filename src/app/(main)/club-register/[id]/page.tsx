import { DetailParams } from '@/shared/model/type';
import ClubRegisterPage from '@/views/club-register/ui/club-register-page';

function Page({ params }: DetailParams) {
  return <ClubRegisterPage params={params} />;
}

export default Page;
