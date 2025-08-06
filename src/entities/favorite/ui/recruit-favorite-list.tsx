import { FavoriteDateItem } from '@/views/favorite/model/type';
import formatDate from '@/entities/favorite/util/format-date';

function RecruitFavoriteList({ data }: { data: FavoriteDateItem[] }) {
  const sortedData = data?.length
    ? [...data].sort((a, b) => {
        return (
          new Date(a.recruitEnd).getTime() - new Date(b.recruitEnd).getTime()
        );
      })
    : [];

  return (
    <div className="ml-4 flex w-[300px] flex-col space-y-2 rounded-xl bg-[#F8F8F8] p-6 text-xs font-semibold">
      <h2 className="text-sm font-bold">모집 일정📒</h2>
      {sortedData.length > 0 ? (
        <ul className="space-y-1">
          {sortedData.map((club) => (
            <li key={club.clubName} className="flex flex-row space-x-2">
              <p>
                {formatDate(club.recruitStart)} ~ {formatDate(club.recruitEnd)}
              </p>
              <p>{club.clubName}</p>
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
