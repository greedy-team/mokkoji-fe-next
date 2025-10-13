import RecruitPage from '@/views/recruit/ui/recruit-page';
import { searchParamsCache } from './search-params';

export const revalidate = 1800;

function Page(searchParams: Record<string, string | string[] | undefined>) {
  searchParamsCache.parse(searchParams);
  return <RecruitPage />;
}

export default Page;
