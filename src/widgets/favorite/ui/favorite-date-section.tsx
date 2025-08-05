'use client';

import CustomCalendar from '@/features/favorite/ui/custom-calendar';
import { useState } from 'react';
import { ClubType } from '@/shared/model/type';

interface FavoriteDateSectionProps {
  data: ClubType[];
  login: boolean;
}

function FavoriteDateSection({ data, login }: FavoriteDateSectionProps) {
  const [value, setValue] = useState<Date>(new Date());

  const filteredClubs = data.filter((club) => {
    const start = new Date(club.recruitStartDate);
    const end = new Date(club.recruitEndDate);

    return value >= start && value <= end;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = date.toLocaleDateString('ko-KR', { weekday: 'short' });
    return `${month}/${day}, ${weekday}`;
  };

  return (
    <div>
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
                  key={club.id}
                  className="flex flex-row space-x-2 text-xs font-normal"
                >
                  <p>
                    {formatDate(club.recruitStartDate)} ~{' '}
                    {formatDate(club.recruitEndDate)}
                  </p>
                  <p>{club.name}</p>
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
    </div>
  );
}

export default FavoriteDateSection;
