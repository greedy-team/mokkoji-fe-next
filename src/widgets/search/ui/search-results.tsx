import { ClubCategory } from '@/shared/model/type';
import ClubSearchItem from '@/entities/search/club-search-item';
import getClubList from '@/widgets/recruit/api/getClubList';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';

interface SearchResultsProps {
  keyword?: string;
  category?: string;
}

async function SearchResults({ keyword, category }: SearchResultsProps) {
  const data = await getClubList({
    page: 1,
    size: 200,
    keyword,
    category: category as ClubCategory,
  });
  if (!data.ok || !data.data) {
    return <ErrorBoundaryUi />;
  }

  return (
    <main className="flex w-[85%] flex-col lg:w-[43%]">
      <section className="mt-13 mb-4">
        <span className="font-bold text-[#00E457]">
          {data.data?.clubs.length}건
        </span>
        <span className="text-black">의 검색결과</span>
      </section>

      {data.data?.clubs.length > 0 ? (
        <section className="space-y-3">
          {data.data?.clubs.map((club) => (
            <ClubSearchItem key={club.id} club={club} />
          ))}
        </section>
      ) : (
        <section className="py-8 text-center text-gray-500">
          검색 결과가 없습니다.
        </section>
      )}
    </main>
  );
}

export default SearchResults;
