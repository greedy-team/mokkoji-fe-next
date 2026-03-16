import { getClubInfo } from '@/shared/api/manage-api';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import CreateFlowContainer from '@/features/admin-recruitment/ui/create/create-flow-container';

interface AdminRecruitmentCreateWidgetProps {
  clubId: number;
}

async function AdminRecruitmentCreateWidget({
  clubId,
}: AdminRecruitmentCreateWidgetProps) {
  const clubInfoResponse = await getClubInfo(clubId);

  if (!clubInfoResponse.ok || !clubInfoResponse.data) {
    return <ErrorBoundaryUi />;
  }

  return (
    <CreateFlowContainer clubId={clubId} clubInfo={clubInfoResponse.data} />
  );
}

export default AdminRecruitmentCreateWidget;
