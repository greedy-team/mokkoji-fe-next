'use client';

import { FavoriteDateItem } from '@/entities/favorite/model/type';
import { useState, useMemo } from 'react';
import { FavoriteDeadLineItem } from './type';

function useCalendarDeadline(
  favoriteDeadlines: FavoriteDateItem[],
  setValue: (date: Date) => void,
) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClubs, setSelectedClubs] = useState<FavoriteDeadLineItem[]>(
    [],
  );

  const deadlineMap = useMemo(() => {
    const map = new Map<string, FavoriteDeadLineItem[]>();
    if (!favoriteDeadlines) {
      return map;
    }
    favoriteDeadlines.forEach((favorite) => {
      const dateKey = new Date(favorite.recruitEnd).toDateString();
      if (!map.has(dateKey)) {
        map.set(dateKey, []);
      }
      map
        .get(dateKey)!
        .push({ clubId: favorite.clubId, clubName: favorite.clubName });
    });

    return map;
  }, [favoriteDeadlines]);

  const handleDateClick = (date: Date) => {
    setValue(date);
    const dateKey = date.toDateString();
    if (deadlineMap.has(dateKey)) {
      setSelectedClubs(deadlineMap.get(dateKey)!);
      setIsModalOpen(true);
    }
  };

  return {
    deadlineMap,
    isModalOpen,
    setIsModalOpen,
    selectedClubs,
    handleDateClick,
  };
}

export default useCalendarDeadline;
