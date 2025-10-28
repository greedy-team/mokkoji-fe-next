import RecruitDetailPage from '@/views/recruit/ui/recruit-detail-page';
import { Suspense } from 'react';
import RecruitDetailSkeleton from '@/entities/recruit/ui/recruit-detail-skeleton';
import { DetailParams } from '@/shared/model/type';

async function Page({ params }: DetailParams) {
  return (
    <Suspense fallback={<RecruitDetailSkeleton />}>
      <RecruitDetailPage params={params} />
    </Suspense>
  );
}

export default Page;
