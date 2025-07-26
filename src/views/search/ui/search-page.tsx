import SearchInput from '@/features/search/ui/search-input';
import SearchResults from '@/widgets/search/ui/search-results';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  
  return (
    <div className="flex flex-col items-center w-full">
      <SearchInput />
      <SearchResults keyword={params.q} />
    </div>
  );
}

export default SearchPage; 