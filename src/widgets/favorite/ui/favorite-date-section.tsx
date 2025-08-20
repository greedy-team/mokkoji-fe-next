'use client';

import CustomCalendar from '@/features/favorite/ui/custom-calendar';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { FavoriteDateItem } from '@/views/favorite/model/type';
import RecruitFavoriteList from '@/entities/favorite/ui/recruit-favorite-list';
import RecruitDeadlineSoonList from '@/entities/favorite/ui/recruit-dead-line-list';
import getFavoriteByDate from '../api/getFavoriteByDate';

function FavoriteDateSection() {
  const [value, setValue] = useState<Date>(new Date());
  const [data, setData] = useState<FavoriteDateItem[]>([]);

  const yearMonth = useMemo(() => {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  }, [value]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getFavoriteByDate({
        yearMonth,
      });

      if (!response.ok) {
        return;
      }

      setData(response.data || []);
    };
    fetchData();
  }, [value, yearMonth]);

  return (
    <>
      <h1 className="mt-7 mb-7 text-2xl font-bold text-[#00E457]">모집 일정</h1>
      <div className="flex flex-col gap-2 lg:flex-row">
        <CustomCalendar value={value} setValue={setValue} data={data} />
        <div className="mt-2 flex flex-col gap-4 lg:mt-0 lg:ml-4 lg:w-[400px]">
          <RecruitFavoriteList data={data} />
          <RecruitDeadlineSoonList data={data} />
        </div>
      </div>
    </>
  );
}

export default FavoriteDateSection;
