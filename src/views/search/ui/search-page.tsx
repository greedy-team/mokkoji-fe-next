import SearchInput from '@/features/search/ui/search-input';
import SearchResults from '@/widgets/search/ui/search-results';
import ScrollTopButton from '@/shared/ui/scroll-top-button';
import { Suspense } from 'react';
import SearchListSkeletonLoading from '@/entities/search/ui/search-list-skeleton-loading';
import { searchParamsCache } from '@/shared/lib/search-search-params';
import PageContainer from '@/shared/ui/page-container';

async function SearchPage() {
  const q = searchParamsCache.get('q');
  const category = searchParamsCache.get('category');
  return (
    <PageContainer className="flex flex-col items-center">
      <SearchInput />
      <Suspense fallback={<SearchListSkeletonLoading />}>
        <SearchResults keyword={q} category={category} />
      </Suspense>
      <ScrollTopButton />
    </PageContainer>
  );
}

export default SearchPage;
