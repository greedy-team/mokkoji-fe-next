'use client';

import { FavoriteDateItem } from '@/views/favorite/model/type';
import { useState, useMemo } from 'react';
import { FavoriteDeadLineItem } from './type';

function useCalendarDeadline(
  data: FavoriteDateItem[],
  setValue: (date: Date) => void,
) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClubs, setSelectedClubs] = useState<FavoriteDeadLineItem[]>(
    [],
  );

  const deadlineMap = useMemo(() => {
    const map = new Map<string, FavoriteDeadLineItem[]>();
    if (!data) {
      return map;
    }
    data.forEach((item) => {
      const dateKey = new Date(item.recruitEnd).toDateString();
      if (!map.has(dateKey)) {
        map.set(dateKey, []);
      }
      map.get(dateKey)!.push({ clubId: item.clubId, clubName: item.clubName });
    });

    return map;
  }, [data]);

  const handleDateClick = (date: Date) => {
    setValue(date);
    const dateKey = date.toDateString();
    if (deadlineMap.has(dateKey)) {
      setSelectedClubs(deadlineMap.get(dateKey)!);
      setModalOpen(true);
    }
  };

  return {
    deadlineMap,
    modalOpen,
    setModalOpen,
    selectedClubs,
    handleDateClick,
  };
}

export default useCalendarDeadline;
