import ClubPage from '@/views/club/ui/club-page';
import { searchParamsCache } from './search-params';

export const revalidate = 1800;

function Page(searchParams: Record<string, string | string[] | undefined>) {
  searchParamsCache.parse(searchParams);
  return <ClubPage />;
}

export default Page;
