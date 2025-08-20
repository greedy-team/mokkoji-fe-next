import SearchInput from '@/features/search/ui/search-input';
import SearchResults from '@/widgets/search/ui/search-results';
import ScrollTopButton from '@/features/recruit/ui/scroll-top-button';

interface SearchPageProps {
  searchParams: Promise<{ q?: string; category?: string }>;
}

async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;

  return (
    <div className="flex w-full flex-col items-center">
      <SearchInput />
      <SearchResults
        keyword={params.q}
        category={params.category?.toUpperCase()}
      />
      <ScrollTopButton />
    </div>
  );
}

export default SearchPage;
