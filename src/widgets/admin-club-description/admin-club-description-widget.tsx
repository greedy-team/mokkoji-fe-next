import { getClubInfo } from '@/shared/api/manage-api';
import { RecruitmentActionParams } from '@/shared/model/type';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';

async function AdminClubDescriptionWidget({ params }: RecruitmentActionParams) {
  const { action, id } = await params;
  const res = await getClubInfo(Number(id));

  if (!res.ok) {
    return <ErrorBoundaryUi />;
  }

  return <div>준비중입니다.</div>;
}

export default AdminClubDescriptionWidget;
