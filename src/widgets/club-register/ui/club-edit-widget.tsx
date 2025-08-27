import ClubEditForm from '@/features/club-register/ui/club-edit-form';
import { getClubInfo } from '@/shared/api/manage-api';
import { DetailParams } from '@/shared/model/type';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import getParams from '@/shared/util/getParams';

async function ClubEditWidget({ params }: DetailParams) {
  const { id } = await getParams({ params });
  const res = await getClubInfo(Number(id));

  if (!res.ok) {
    return <ErrorBoundaryUi />;
  }

  return <ClubEditForm clubInfo={res.data} clubId={Number(id)} />;
}

export default ClubEditWidget;
