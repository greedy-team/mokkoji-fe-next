import SearchPage from '@/views/search/ui/search-page';
import { searchParamsCache } from './search-params';

function Page(searchParams: Record<string, string | string[] | undefined>) {
  searchParamsCache.parse(searchParams);
  return <SearchPage />;
}

export default Page;
