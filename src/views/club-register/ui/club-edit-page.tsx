import { DetailParams } from '@/shared/model/type';
import ClubEditWidget from '@/widgets/club-register/ui/club-edit-widget';

function ClubEditPage({ params }: DetailParams) {
  return <ClubEditWidget params={params} />;
}

export default ClubEditPage;
