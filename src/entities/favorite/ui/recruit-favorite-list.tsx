import { FavoriteDateItem } from '@/views/favorite/model/type';
import formatDate from '@/entities/favorite/util/format-date';
import Link from 'next/link';

function RecruitFavoriteList({ data }: { data: FavoriteDateItem[] }) {
  console.log('data!', data);
  const sortedData = data?.length
    ? [...data].sort((a, b) => {
        return (
          new Date(a.recruitEnd).getTime() - new Date(b.recruitEnd).getTime()
        );
      })
    : [];

  return (
    <div className="flex w-full flex-col space-y-2 rounded-xl bg-[#F8F8F8] p-6 text-xl font-semibold">
      <h2 className="text-2xl font-bold">모집 일정📒</h2>
      {sortedData.length > 0 ? (
        <ul className="space-y-1">
          {sortedData.map((club) => (
            <li key={`${club.clubId}`} className="flex flex-row space-x-2">
              <span>
                {formatDate(club.recruitStart)} ~ {formatDate(club.recruitEnd)}
              </span>
              <span>
                <Link
                  href={`/club/${club.clubId}`}
                  className="text-[#00E457] underline"
                >
                  {club.clubName}
                </Link>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <span>이번 달 모집 일정이 없습니다.</span>
      )}
    </div>
  );
}

export default RecruitFavoriteList;
