import FavoritePage from '@/views/favorite/ui/favorite-page';
import { type SearchParams } from 'nuqs/server';
import { searchParamsCache } from './search-params';

async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
  await searchParamsCache.parse(searchParams);
  return <FavoritePage />;
}

export default Page;
