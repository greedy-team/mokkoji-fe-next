import SearchPage from '@/views/search/ui/search-page';

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

function Page({ searchParams }: PageProps) {
  return <SearchPage searchParams={searchParams} />;
}

export default Page;
