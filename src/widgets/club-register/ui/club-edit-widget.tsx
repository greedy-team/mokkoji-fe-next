import ClubEditForm from '@/features/club-register/ui/club-edit-form';
import { getClubInfo } from '@/shared/api/manage-api';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import { DetailParams } from '@/shared/model/type';

async function ClubEditWidget({ params }: DetailParams) {
  const { id } = await params;
  const clubInfoResponse = await getClubInfo(Number(id));

  if (!clubInfoResponse.ok) {
    return <ErrorBoundaryUi />;
  }

  return <ClubEditForm clubInfo={clubInfoResponse.data} clubId={Number(id)} />;
}

export default ClubEditWidget;
