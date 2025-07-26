import searchClubs from '../api/searchClubs';
import Link from 'next/link';
import { ClubType } from '@/shared/model/type';

interface SearchResultsProps {
  keyword?: string;
}

async function SearchResults({ keyword }: SearchResultsProps) {
  let clubs: ClubType[] = [];
  
  if (keyword) {
    try {
      clubs = await searchClubs({ keyword });

    } catch (error) {
      console.error('검색 오류:', error);
    }
  }

  if (!keyword) return null;
  
                return (
                <div className="w-[650px] flex flex-col">
                  <div className="mt-8 mb-4">
                    <span className="text-[#00E457] font-bold">{clubs.length}건</span>
                    <span className="text-black">의 검색결과</span>
                  </div>

                  <div className="space-y-3 w-full">
        {clubs.map((club) => (
          <Link key={club.id} href={`/club/${club.id}`}>
            <div className="bg-white rounded-lg p-4 mb-3 cursor-pointer hover:bg-gray-50 transition-colors border border-gray-100 shadow-sm w-full">
              <div className="flex-1">
                <div className="mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{club.name}</h3>
                    <span className="text-sm text-[#9C9C9C]">
                      {club.category ? `${club.category} 동아리` : '동아리'}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {club.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {clubs.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
}

export default SearchResults; 