import ClubPage from '@/views/club/ui/club-page';
import { type SearchParams } from 'nuqs/server';
import { searchParamsCache } from './search-params';

function Page({ searchParams }: RecruitItemListProps) {
  return <ClubPage searchParams={searchParams} />;
}

export default Page;
