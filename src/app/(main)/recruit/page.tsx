import RecruitPage from '@/views/recruit/ui/recruit-page';
import { type SearchParams } from 'nuqs/server';
import { searchParamsCache } from './search-params';

function Page({
  searchParams,
}: {
  searchParams: Promise<RecruitmentSearchParams>;
}) {
  return <RecruitPage searchParams={searchParams} />;
}

export default Page;
