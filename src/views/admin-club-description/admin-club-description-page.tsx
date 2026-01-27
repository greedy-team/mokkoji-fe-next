import { RecruitmentActionParams } from '@/shared/model/type';
import SharedLoading from '@/shared/ui/loading';
import { Suspense } from 'react';
import AdminClubDescriptionWidget from '@/widgets/admin-club-description/admin-club-description-widget';

function AdminClubDescriptionPage({ params }: RecruitmentActionParams) {
  return (
    <div className="w-full">
      <Suspense fallback={<SharedLoading />}>
        <AdminClubDescriptionWidget params={params} />
      </Suspense>
    </div>
  );
}

export default AdminClubDescriptionPage;
