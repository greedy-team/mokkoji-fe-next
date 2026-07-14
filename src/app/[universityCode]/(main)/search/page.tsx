import SearchPage from '@/views/search/ui/search-page';
import { type SearchParams } from 'nuqs/server';
import { urlCodeToApiCode } from '@/shared/lib/universityMeta';
import { searchParamsCache } from './search-params';

type PageProps = {
  params: Promise<{ universityCode: string }>;
  searchParams: Promise<SearchParams>;
};

async function Page({ params, searchParams }: PageProps) {
  const { universityCode } = await params;
  await searchParamsCache.parse(searchParams);
  return <SearchPage universityCode={urlCodeToApiCode(universityCode)} />;
}

export default Page;
