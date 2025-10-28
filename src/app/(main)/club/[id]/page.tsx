import ClubDetailPage from '@/views/club/ui/club-detail-page';
import { Suspense } from 'react';
import ClubDetailSkeleton from '@/entities/club/ui/club-detail-skeleton';
import { DetailParams } from '@/shared/model/type';

async function Page({ params }: DetailParams) {
  return (
    <Suspense fallback={<ClubDetailSkeleton />}>
      <ClubDetailPage params={params} />
    </Suspense>
  );
}

export default Page;
