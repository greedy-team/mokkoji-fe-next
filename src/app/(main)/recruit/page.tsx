import RecruitPage from '@/views/recruit/ui/recruit-page';
import { type SearchParams } from 'nuqs/server';
import { searchParamsCache } from './search-params';

export const revalidate = 1800;

type PageProps = {
  searchParams: Promise<SearchParams>;
};

async function Page({ searchParams }: PageProps) {
  await searchParamsCache.parse(searchParams);
  return <RecruitPage />;
}

export default Page;
