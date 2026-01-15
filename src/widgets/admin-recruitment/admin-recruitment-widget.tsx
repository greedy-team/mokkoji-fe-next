import AdminRecruitmentForm from '@/features/admin-recruitment/ui/admin-recruitment-form';
import { getClubInfo } from '@/shared/api/manage-api';
import { RecruitmentActionParams } from '@/shared/model/type';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import getRecruitDetail from '@/views/club/api/getRecruitDetail';

async function AdminRecruitmentWidget({ params }: RecruitmentActionParams) {
  const { action, id } = await params;
  const clubId = Number(id);

  const res = await getClubInfo(clubId);

  if (!res.ok) {
    return <ErrorBoundaryUi />;
  }

  let recruitmentData = null;

  if (action === 'edit') {
    const recruitmentRes = await getRecruitDetail(clubId);

    if (!recruitmentRes.ok || !recruitmentRes.data) {
      return <ErrorBoundaryUi />;
    }

    recruitmentData = recruitmentRes.data;
  }

  return (
    <AdminRecruitmentForm
      clubInfo={res.data}
      clubId={clubId}
      action={action}
      initialData={recruitmentData}
    />
  );
}

export default AdminRecruitmentWidget;
