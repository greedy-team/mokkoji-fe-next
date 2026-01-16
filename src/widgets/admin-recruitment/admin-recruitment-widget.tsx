import { RecruitmentActionParams } from '@/shared/model/type';
import CreateWidget from './create-widget';
import EditWidget from './edit-widget';

async function AdminRecruitmentWidget({ params }: RecruitmentActionParams) {
  const { action, id } = await params;
  const clubId = Number(id);

  switch (action) {
    case 'create':
      return <CreateWidget clubId={clubId} />;
    case 'edit':
      return <EditWidget clubId={clubId} />;
    default:
      return null;
  }
}

export default AdminRecruitmentWidget;
