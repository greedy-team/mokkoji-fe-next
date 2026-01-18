import { ClubCategory } from '@/shared/model/type';
import ClubSearchItem from '@/entities/search/ui/club-search-item';
import getClubList from '@/widgets/recruit/api/getClubList';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';

interface SearchResultsProps {
  keyword?: string;
  category?: string;
}

const CATEGORY_MAP: Record<string, ClubCategory> = {
  cultural_art: ClubCategory.CULTURAL_ART,
  academic_cultural: ClubCategory.ACADEMIC_CULTURAL,
  volunteer_social: ClubCategory.VOLUNTEER_SOCIAL,
  sports: ClubCategory.SPORTS,
  religious: ClubCategory.RELIGIOUS,
  other: ClubCategory.OTHER,
};

async function SearchResults({ keyword, category }: SearchResultsProps) {
  const safeCategory = category ? CATEGORY_MAP[category] : undefined;

  const data = await getClubList({
    page: 1,
    size: 200,
    keyword,
    ...(safeCategory ? { category: safeCategory } : {}),
  });
  if (!data.ok || !data.data) {
    return <ErrorBoundaryUi />;
  }

  return (
    <main className="flex w-[85%] flex-col lg:w-[43%]">
      <section className="mt-13 mb-4">
        <span className="text-primary-500 font-bold">
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
        <section className="text-text-secondary py-8 text-center">
          검색 결과가 없습니다.
        </section>
      )}
    </main>
  );
}

export default SearchResults;
