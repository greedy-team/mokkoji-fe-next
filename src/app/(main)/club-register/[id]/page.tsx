import ClubEditPage from '@/views/club-register/ui/club-edit-page';
import { searchParamsCache } from './search-params';

function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  searchParamsCache.parse(searchParams);

  return <ClubEditPage />;
}

export default Page;
