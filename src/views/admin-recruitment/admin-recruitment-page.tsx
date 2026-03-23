import { RecruitmentActionParams } from '@/shared/model/type';
import SharedLoading from '@/shared/ui/loading';
import { Suspense } from 'react';
import AdminRecruitmentWidget from '@/widgets/admin-recruitment/admin-recruitment-widget';

function AdminRecruitmentPage({ params }: RecruitmentActionParams) {
  return (
    <Suspense fallback={<SharedLoading />}>
      <AdminRecruitmentWidget params={params} />
    </Suspense>
  );
}

export default AdminRecruitmentPage;
