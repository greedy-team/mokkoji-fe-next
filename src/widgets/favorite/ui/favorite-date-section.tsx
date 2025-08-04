'use client';

import CustomCalendar from '@/features/favorite/ui/custom-calendar';
import { useEffect, useState } from 'react';
import { FavoriteDateList } from '@/views/favorite/model/type';
import getFavoriteByDate from '../api/getFavoriteByDate';

function FavoriteDateSection() {
  const [value, setValue] = useState<Date>(new Date());
  const [data, setData] = useState<FavoriteDateList[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const year = value.getFullYear();
  //       const month = String(value.getMonth() + 1).padStart(2, '0');
  //       const yearMonth = `${year}-${month}`;
  //       const response = await getFavoriteByDate({ yearMonth });
  //       setData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching favorite clubs:', error);
  //     }
  //   };
  //   fetchData();
  // }, [value]);

  const filteredClubs = data.filter((club) => {
    const start = new Date(club.data.recruitStart);
    const end = new Date(club.data.recruitEnd);

    return value >= start && value <= end;
  });

  const formatDate = (dateString: Date) => {
    const month = dateString.getMonth() + 1;
    const day = dateString.getDate();
    const weekday = dateString.toLocaleDateString('ko-KR', {
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
                  key={club.data.clubName}
                  className="flex flex-row space-x-2 text-xs font-normal"
                >
                  <p>
                    {formatDate(club.data.recruitStart)} ~{' '}
                    {formatDate(club.data.recruitEnd)}
                  </p>
                  <p>{club.data.clubName}</p>
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
