import { getClubInfo } from '@/shared/api/manage-api';
import { RecruitmentActionParams } from '@/shared/model/type';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import EditFlowContainer from '@/features/admin-club-description/ui/edit/edit-flow-container';
import CreateFlowContainer from '@/features/admin-club-description/ui/create/create-flow-container';

async function AdminClubDescriptionWidget({ params }: RecruitmentActionParams) {
  const { action, id } = await params;

  if (action === 'create') {
    return <CreateFlowContainer />;
  }

  const clubId = Number(id);
  const clubInfoResponse = await getClubInfo(clubId);

  if (!clubInfoResponse.ok || !clubInfoResponse.data) {
    return <ErrorBoundaryUi />;
  }

  return <EditFlowContainer clubInfo={clubInfoResponse.data} clubId={clubId} />;
}

export default AdminClubDescriptionWidget;
