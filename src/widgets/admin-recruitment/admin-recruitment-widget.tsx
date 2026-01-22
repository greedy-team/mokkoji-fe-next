import { RecruitmentActionParams } from '@/shared/model/type';
import AdminRecruitmentCreateWidget from './admin-recruitment-create-widget';
import AdminRecruitmentEditWidget from './admin-recruitment-edit-widget';

async function AdminRecruitmentWidget({ params }: RecruitmentActionParams) {
  const { action, id } = await params;
  const clubId = Number(id);

  switch (action) {
    case 'create':
      return <AdminRecruitmentCreateWidget clubId={clubId} />;
    case 'edit':
      return <AdminRecruitmentEditWidget clubId={clubId} />;
    default:
      return null;
  }
}

export default AdminRecruitmentWidget;
