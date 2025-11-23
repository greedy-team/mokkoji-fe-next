import ClubDetailPage from '@/views/club/ui/club-detail-page';
import { Suspense } from 'react';
import ClubDetailSkeleton from '@/entities/club/ui/club-detail-skeleton';

interface PageProps {
  params: { id: string };
  searchParams: { tab?: string };
}

async function Page({ params, searchParams }: PageProps) {
  return (
    <Suspense fallback={<ClubDetailSkeleton />}>
      <ClubDetailPage params={params} searchParams={searchParams} />
    </Suspense>
  );
}

export default Page;
