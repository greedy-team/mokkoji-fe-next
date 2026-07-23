'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import CustomCalendar from '@/features/favorite/ui/custom-calendar';
import RecruitFavoriteList from '@/entities/favorite/ui/recruit-favorite-list';
import RecruitDeadlineSoonList from '@/entities/favorite/ui/recruit-dead-line-list';
import favoriteQueries from '../api/queries';

function FavoriteDynamicSection() {
  const [value, setValue] = useState<Date>(new Date());
  const [activeStartDate, setActiveStartDate] = useState<Date>(new Date());

  const yearMonth = useMemo(() => {
    const year = activeStartDate.getFullYear();
    const month = String(activeStartDate.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  }, [activeStartDate]);

  const { data: favoriteRecruitments = [] } = useQuery(
    favoriteQueries.recruit(yearMonth),
  );

  return (
    <div className="flex flex-col-reverse gap-2 lg:flex-row">
      <CustomCalendar
        value={value}
        setValue={setValue}
        activeStartDate={activeStartDate}
        setActiveStartDate={setActiveStartDate}
        data={favoriteRecruitments}
      />
      <div className="flex flex-col gap-4 lg:ml-4 lg:w-[400px]">
        <RecruitFavoriteList data={favoriteRecruitments} />
        <RecruitDeadlineSoonList data={favoriteRecruitments} />
      </div>
    </div>
  );
}

export default FavoriteDynamicSection;
