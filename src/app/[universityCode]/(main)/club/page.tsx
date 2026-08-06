import ClubPage from '@/views/club/ui/club-page';
import { type SearchParams } from 'nuqs/server';
import { toApiCode } from '@/shared/lib/urlCodeConverter';
import { searchParamsCache } from './search-params';

type PageProps = {
  params: Promise<{ universityCode: string }>;
  searchParams: Promise<SearchParams>;
};

async function Page({ params, searchParams }: PageProps) {
  const { universityCode } = await params;
  await searchParamsCache.parse(searchParams);
  return <ClubPage universityCode={toApiCode(universityCode)} />;
}

export default Page;
