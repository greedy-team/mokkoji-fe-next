import { DetailParams } from '@/shared/model/type';
import ClubRegisterWidget from '@/widgets/club-register/ui/club-register-widget';

function ClubRegisterPage({ params }: DetailParams) {
  return <ClubRegisterWidget params={params} />;
}

export default ClubRegisterPage;
