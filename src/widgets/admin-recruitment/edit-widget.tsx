import { getClubInfo } from '@/shared/api/manage-api';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import EditFlowContainer from '@/features/admin-recruitment/ui/edit/edit-flow-container';
import getClubRecruitments from '@/views/club/api/getClubRecruitments';

interface Props {
  clubId: number;
}

async function EditWidget({ clubId }: Props) {
  const [clubInfoRes, recruitmentsRes] = await Promise.all([
    getClubInfo(clubId),
    getClubRecruitments(clubId),
  ]);

  if (!clubInfoRes.ok || !clubInfoRes.data) {
    return <ErrorBoundaryUi />;
  }

  if (!recruitmentsRes.ok || !recruitmentsRes.data) {
    return <ErrorBoundaryUi />;
  }

  return (
    <EditFlowContainer
      clubInfo={clubInfoRes.data}
      recruitments={recruitmentsRes.data.recruitments}
    />
  );
}

export default EditWidget;
