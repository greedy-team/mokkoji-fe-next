import { FavoriteDateItem } from '@/views/favorite/model/type';
import formatDate from '@/entities/favorite/util/format-date';
import Link from 'next/link';
import { useMemo } from 'react';
import Image from 'next/image';

function RecruitFavoriteList({ data }: { data: FavoriteDateItem[] }) {
  const sortedData = useMemo(() => {
    return data?.length
      ? [...data].sort((a, b) => {
          return (
            new Date(a.recruitEnd).getTime() - new Date(b.recruitEnd).getTime()
          );
        })
      : [];
  }, [data]);

  return (
    <div className="flex w-full flex-col space-y-2 rounded-xl bg-[#FBFBFB] p-6 text-xl font-semibold lg:p-10">
      <h2 className="flex items-center gap-2 text-sm font-bold lg:text-2xl">
        <Image
          src="/favorite/calendar.svg"
          alt="모집 일정"
          width={24}
          height={24}
          className="h-[24px] w-[24px] lg:h-[36px] lg:w-[36px]"
        />
        모집 일정
      </h2>
      {sortedData.length > 0 ? (
        <ul className="space-y-1">
          {sortedData.map((club) => (
            <li
              key={`${club.clubId}`}
              className="flex flex-row space-x-2 text-base font-medium lg:text-xl"
            >
              <span>
                {formatDate(club.recruitStart)} ~ {formatDate(club.recruitEnd)}
              </span>
              <span>
                <Link href={`/club/${club.clubId}`}>{club.clubName}</Link>
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
