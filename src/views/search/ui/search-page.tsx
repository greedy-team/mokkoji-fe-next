import SearchInput from '@/features/search/ui/search-input';
import SearchResults from '@/widgets/search/ui/search-results';
import ScrollTopButton from '@/features/recruit/ui/scroll-top-button';
import { Suspense } from 'react';
import SearchListSkeletonLoading from '@/entities/search/ui/search-list-skeleton-loading';

interface SearchPageProps {
  searchParams: Promise<{ q?: string; category?: string }>;
}

async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;

  return (
    <div className="flex w-full flex-col items-center">
      <SearchInput />
      <Suspense fallback={<SearchListSkeletonLoading />}>
        <SearchResults
          keyword={params.q}
          category={params.category?.toUpperCase()}
        />
      </Suspense>
      <ScrollTopButton />
    </div>
  );
}

export default SearchPage;
