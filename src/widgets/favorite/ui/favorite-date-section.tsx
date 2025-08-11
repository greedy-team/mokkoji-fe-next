'use client';

import CustomCalendar from '@/features/favorite/ui/custom-calendar';
import { useEffect, useMemo, useState } from 'react';
import { FavoriteDateItem } from '@/views/favorite/model/type';
import { useSession } from 'next-auth/react';
import RecruitFavoriteList from '@/entities/favorite/ui/recruit-favorite-list';
import RecruitDeadlineSoonList from '@/entities/favorite/ui/recruit-dead-line-list';
import getFavoriteByDate from '../api/getFavoriteByDate';

function FavoriteDateSection() {
  const [value, setValue] = useState<Date>(new Date());
  const [data, setData] = useState<FavoriteDateItem[]>([]);
  const { data: session, status } = useSession();

  const yearMonth = useMemo(() => {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  }, [value]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (status === 'unauthenticated' || !session?.accessToken) return;
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
  }, [value, session, status, yearMonth]);

  return (
    <>
      <h1 className="mt-7 mb-7 text-base font-bold text-[#00E457]">
        모집 일정
      </h1>
      <div className="flex flex-col gap-2 lg:flex-row">
        <CustomCalendar value={value} setValue={setValue} data={data} />
        <div className="mt-2 flex flex-col gap-4 lg:mt-0 lg:ml-4 lg:w-[300px]">
          <RecruitFavoriteList data={data} />
          <RecruitDeadlineSoonList data={data} />
        </div>
      </div>
    </>
  );
}

export default FavoriteDateSection;
