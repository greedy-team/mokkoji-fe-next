import ClubEditForm from '@/features/club-register/ui/club-edit-form';
import { getClubInfo } from '@/shared/api/manage-api';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import { searchParamsCache } from '@/app/(main)/club-register/[id]/search-params';

async function ClubEditWidget() {
  const id = searchParamsCache.get('id');
  const res = await getClubInfo(id);

  if (!res.ok) {
    return <ErrorBoundaryUi />;
  }

  return <ClubEditForm clubInfo={res.data} clubId={id} />;
}

export default ClubEditWidget;
