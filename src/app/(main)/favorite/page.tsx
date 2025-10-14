import FavoritePage from '@/views/favorite/ui/favorite-page';
import { searchParamsCache } from './search-params';

function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  searchParamsCache.parse(searchParams);
  return <FavoritePage />;
}

export default Page;
