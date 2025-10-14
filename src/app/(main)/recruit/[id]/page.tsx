import RecruitDetailPage from '@/views/recruit/ui/recruit-detail-page';
import { Suspense } from 'react';
import RecruitDetailSkeleton from '@/entities/recruit/ui/recruit-detail-skeleton';
import { searchParamsCache } from './search-params';

function Page(searchParams: Record<string, string | string[] | undefined>) {
  searchParamsCache.parse(searchParams);
  return (
    <Suspense fallback={<RecruitDetailSkeleton />}>
      <RecruitDetailPage />
    </Suspense>
  );
}

export default Page;
