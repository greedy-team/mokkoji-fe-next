import Link from 'next/link';
import { ClubType } from '@/shared/model/type';
import { toast } from 'react-toastify';
import searchClubs from '../api/searchClubs';

interface SearchResultsProps {
  keyword?: string;
}

interface ClubItemProps {
  club: ClubType;
}

function ClubItem({ club }: ClubItemProps) {
  return (
    <Link href={`/club/${club.id}`}>
      <article className="mb-3 cursor-pointer rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-colors hover:bg-gray-50">
        <header className="mb-2">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{club.name}</h3>
            <span className="text-sm text-[#9C9C9C]">
              {club.category ? `${club.category} 동아리` : '동아리'}
            </span>
          </div>
        </header>
        <p className="text-sm leading-relaxed text-gray-600">
          {club.description}
        </p>
      </article>
    </Link>
  );
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
    <main className="flex w-[650px] flex-col">
      <section className="mt-8 mb-4">
        <span className="font-bold text-[#00E457]">{clubs.length}건</span>
        <span className="text-black">의 검색결과</span>
      </section>

      {clubs.length > 0 ? (
        <section className="space-y-3">
          {clubs.map((club) => (
            <ClubItem key={club.id} club={club} />
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
