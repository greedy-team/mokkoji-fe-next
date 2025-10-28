import ClubDetailPage from '@/views/club/ui/club-detail-page';
import { Suspense } from 'react';
import ClubDetailSkeleton from '@/entities/club/ui/club-detail-skeleton';
import { type SearchParams } from 'nuqs/server';
import { searchParamsCache } from './search-params';

type PageProps = {
  searchParams: Promise<SearchParams>;
};

async function Page({ searchParams }: PageProps) {
  await searchParamsCache.parse(searchParams);
  return (
    <Suspense fallback={<ClubDetailSkeleton />}>
      <ClubDetailPage />
    </Suspense>
  );
}

export default Page;
