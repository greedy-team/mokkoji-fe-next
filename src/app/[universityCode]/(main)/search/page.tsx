import SearchPage from '@/views/search/ui/search-page';
import { type SearchParams } from 'nuqs/server';
import { getSession } from '@/shared/lib/cookie-session';
import { urlCodeToApiCode } from '@/shared/lib/universityMeta';
import { searchParamsCache } from './search-params';

type PageProps = {
  params: Promise<{ universityCode: string }>;
  searchParams: Promise<SearchParams>;
};

async function Page({ params, searchParams }: PageProps) {
  const { universityCode } = await params;
  await searchParamsCache.parse(searchParams);
  const session = await getSession();
  const effectiveUniversityCode =
    session?.universityCode ?? urlCodeToApiCode(universityCode);
  return <SearchPage universityCode={effectiveUniversityCode} />;
}

export default Page;
