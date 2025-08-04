'use client';

import CustomCalendar from '@/features/favorite/ui/custom-calendar';
import { useEffect, useState } from 'react';
import { FavoriteDateItem } from '@/views/favorite/model/type';
import { useSession } from 'next-auth/react';
import getFavoriteByDate from '../api/getFavoriteByDate';

function FavoriteDateSection() {
  const [value, setValue] = useState<Date>(new Date());
  const [data, setData] = useState<FavoriteDateItem[]>([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (status === 'unauthenticated' || !session?.accessToken) return;
        const year = value.getFullYear();
        const month = String(value.getMonth() + 1).padStart(2, '0');
        const yearMonth = `${year}-${month}`;
        const response = await getFavoriteByDate({
          yearMonth,
          accessToken: session?.accessToken,
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching favorite clubs:', error);
      }
    };
    fetchData();
  }, [value, session]);

  const filteredClubs = data.filter((club) => {
    const start = new Date(club.recruitStart);
    const end = new Date(club.recruitEnd);

    return value >= start && value <= end;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = date.toLocaleDateString('ko-KR', {
      weekday: 'short',
    });
    return `${month}/${day}, ${weekday}`;
  };

  return (
    <>
      <h1 className="mt-7 mb-7 text-base font-bold text-[#00E457]">
        모집 일정
      </h1>
      <div className="flex flex-row items-center justify-between">
        <CustomCalendar value={value} setValue={setValue} />
        <div className="ml-4 flex w-[210px] flex-col space-y-2 rounded-xl bg-[#F8F8F8] p-4">
          <h2 className="text-sm font-bold">모집 일정📒</h2>
          {filteredClubs.length > 0 ? (
            <ul className="space-y-1">
              {filteredClubs.map((club) => (
                <li
                  key={club.clubName}
                  className="flex flex-row space-x-2 text-xs font-normal"
                >
                  <p>
                    {formatDate(club.recruitStart)} ~{' '}
                    {formatDate(club.recruitEnd)}
                  </p>
                  <p>{club.clubName}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-xl bg-[#F8F8F8] p-4 text-sm text-gray-500">
              이번 달 모집 일정이 없습니다.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default FavoriteDateSection;
