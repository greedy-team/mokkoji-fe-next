import ClubEditPage from '@/views/club-register/ui/club-edit-page';
import { type SearchParams } from 'nuqs/server';
import { searchParamsCache } from './search-params';

type PageProps = {
  searchParams: Promise<SearchParams>;
};

async function Page({ searchParams }: PageProps) {
  await searchParamsCache.parse(searchParams);

  return <ClubEditPage />;
}

export default Page;
