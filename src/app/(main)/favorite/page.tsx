import FavoritePage from '@/views/favorite/ui/favorite-page';
import { type SearchParams } from 'nuqs/server';
import { searchParamsCache } from './search-params';

type PageProps = {
  searchParams: Promise<SearchParams>;
};

async function Page({ searchParams }: PageProps) {
  await searchParamsCache.parse(searchParams);
  return <FavoritePage />;
}

export default Page;
