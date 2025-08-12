import { ClubType } from '@/shared/model/type';
import { toast } from 'react-toastify';
import ClubSearchItem from '@/entities/search/club-search-item';
import searchClubs from '../api/searchClubs';

interface SearchResultsProps {
  keyword?: string;
}

async function SearchResults({ keyword }: SearchResultsProps) {
  let clubs: ClubType[] = [];

  if (keyword) {
    try {
      clubs = await searchClubs({ keyword });
    } catch {
      toast.error('검색 중 오류가 발생했습니다.');
    }
  }

  if (!keyword) return null;

  return (
    <main className="flex w-[85%] flex-col lg:w-[43%]">
      <section className="mt-8 mb-4">
        <span className="font-bold text-[#00E457]">{clubs.length}건</span>
        <span className="text-black">의 검색결과</span>
      </section>

      {clubs.length > 0 ? (
        <section className="space-y-3">
          {clubs.map((club) => (
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
