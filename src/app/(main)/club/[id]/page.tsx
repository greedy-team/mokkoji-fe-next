import ClubDetailPage from '@/views/club/ui/club-detail-page';
import { DetailParams } from '@/shared/model/type';
import { Suspense } from 'react';
import ClubDetailSkeleton from '@/entities/club/ui/club-detail-skeleton';

function Page({ params }: DetailParams) {
  return (
    <Suspense fallback={<ClubDetailSkeleton />}>
      <ClubDetailPage params={params} />
    </Suspense>
  );
}

export default Page;
