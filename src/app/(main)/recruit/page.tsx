import RecruitPage from '@/views/recruit/ui/recruit-page';
import { type SearchParams } from 'nuqs/server';
import { searchParamsCache } from './search-params';

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export const revalidate = 86400;

async function Page({ searchParams }: PageProps) {
  await searchParamsCache.parse(searchParams);
  return <RecruitPage />;
}

export default Page;
