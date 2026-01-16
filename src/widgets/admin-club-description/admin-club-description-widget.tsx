import { getClubInfo } from '@/shared/api/manage-api';
import { RecruitmentActionParams } from '@/shared/model/type';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import EditFlowContainer from '@/features/admin-club-description/ui/edit/edit-flow-container';

async function AdminClubDescriptionWidget({ params }: RecruitmentActionParams) {
  const { id } = await params;
  const clubId = Number(id);
  const res = await getClubInfo(clubId);

  if (!res.ok || !res.data) {
    return <ErrorBoundaryUi />;
  }

  return <EditFlowContainer clubInfo={res.data} clubId={clubId} />;
}

export default AdminClubDescriptionWidget;
