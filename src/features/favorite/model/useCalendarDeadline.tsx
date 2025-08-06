'use client';

import { FavoriteDateItem } from '@/views/favorite/model/type';
import { useState, useMemo } from 'react';

function useCalendarDeadline(
  data: FavoriteDateItem[],
  setValue: (date: Date) => void,
) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClubs, setSelectedClubs] = useState<string[]>([]);

  const deadlineMap = useMemo(() => {
    const map = new Map<string, string[]>();
    if (!data) {
      return map;
    }
    data.forEach((item) => {
      const dateKey = new Date(item.recruitEnd).toDateString();
      if (!map.has(dateKey)) {
        map.set(dateKey, []);
      }
      map.get(dateKey)!.push(item.clubName);
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
