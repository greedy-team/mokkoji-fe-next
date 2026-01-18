import { ClubCategory } from '@/shared/model/type';
import ClubSearchItem from '@/entities/search/ui/club-search-item';
import getClubList from '@/widgets/recruit/api/getClubList';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import getClubRecruitList from '@/widgets/club/api/getClubRecruitList';

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

  const [clubsRes, recruitmentsRes] = await Promise.all([
    getClubList({
      page: 1,
      size: 200,
      keyword,
      ...(safeCategory ? { category: safeCategory } : {}),
    }),
    getClubRecruitList({
      page: 1,
      size: 500,
    }),
  ]);

  if (!clubsRes.ok || !clubsRes.data) return <ErrorBoundaryUi />;
  if (!recruitmentsRes.ok || !recruitmentsRes.data) return <ErrorBoundaryUi />;

  const recruitmentClubIdSet = new Set<number>(
    recruitmentsRes.data.recruitments
      .map((r) => r.club?.id)
      .filter((id): id is number => typeof id === 'number'),
  );

  const filteredClubs = clubsRes.data.clubs.filter((club) =>
    recruitmentClubIdSet.has(club.id),
  );

  return (
    <main className="flex w-[85%] flex-col lg:w-[43%]">
      <section className="mt-13 mb-4">
        <span className="text-primary-500 font-bold">
          {filteredClubs.length}건
        </span>
        <span className="text-black">의 검색결과</span>
      </section>

      {clubsRes.data?.clubs.length > 0 ? (
        <section className="space-y-3">
          {filteredClubs.map((club) => (
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
