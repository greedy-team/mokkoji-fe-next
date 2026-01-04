import AdminRecruitmentForm from '@/features/admin-recruitment/ui/admin-recruitment-form';
import { getClubInfo } from '@/shared/api/manage-api';
import { RecruitmentActionParams } from '@/shared/model/type';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';

async function AdminRecruitmentWidget({ params }: RecruitmentActionParams) {
  const { action, id } = await params;
  const res = await getClubInfo(Number(id));

  if (!res.ok) {
    return <ErrorBoundaryUi />;
  }

  return <AdminRecruitmentForm clubInfo={res.data} clubId={Number(id)} />;
}

export default AdminRecruitmentWidget;
