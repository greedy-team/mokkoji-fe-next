import { RecruitmentActionParams } from '@/shared/model/type';
import SharedLoading from '@/shared/ui/loading';
import { Suspense } from 'react';
import AdminRecruitmentWidget from '@/widgets/admin-recruitment/admin-recruitment-widget';

function AdminRecruitmentPage({ params }: RecruitmentActionParams) {
  return (
    <div className="w-full">
      <h1 className="text-[28px] font-bold">모집 공고</h1>
      <Suspense fallback={<SharedLoading />}>
        <AdminRecruitmentWidget params={params} />
      </Suspense>
    </div>
  );
}

export default AdminRecruitmentPage;
