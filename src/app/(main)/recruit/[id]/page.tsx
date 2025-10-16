import RecruitDetailPage from '@/views/recruit/ui/recruit-detail-page';
import { Suspense } from 'react';
import RecruitDetailSkeleton from '@/entities/recruit/ui/recruit-detail-skeleton';
import { type SearchParams } from 'nuqs/server';
import { searchParamsCache } from './search-params';

type PageProps = {
  searchParams: Promise<SearchParams>;
};

async function Page({ searchParams }: PageProps) {
  await searchParamsCache.parse(searchParams);
  return (
    <Suspense fallback={<RecruitDetailSkeleton />}>
      <RecruitDetailPage />
    </Suspense>
  );
}

export default Page;
