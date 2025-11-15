import RecruitDetailPage from '@/views/recruit/ui/recruit-detail-page';
import { Suspense } from 'react';
import RecruitDetailSkeleton from '@/entities/recruit/ui/recruit-detail-skeleton';
import { DetailParams } from '@/shared/model/type';

interface PageProps {
  params: { id: string };
  searchParams: { tab?: string };
}

async function Page({ params, searchParams }: PageProps) {
  return (
    <Suspense fallback={<RecruitDetailSkeleton />}>
      <RecruitDetailPage params={params} searchParams={searchParams} />
    </Suspense>
  );
}

export default Page;
