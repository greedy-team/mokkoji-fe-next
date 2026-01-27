import { getClubInfo } from '@/shared/api/manage-api';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import CreateFlowContainer from '@/features/admin-recruitment/ui/create/create-flow-container';

interface Props {
  clubId: number;
}

async function AdminRecruitmentCreateWidget({ clubId }: Props) {
  const res = await getClubInfo(clubId);

  if (!res.ok || !res.data) {
    return <ErrorBoundaryUi />;
  }

  return <CreateFlowContainer clubId={clubId} clubInfo={res.data} />;
}

export default AdminRecruitmentCreateWidget;
