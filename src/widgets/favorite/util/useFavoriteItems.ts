import { ClubType } from '@/shared/model/type';
import { useState } from 'react';

interface FavoriteItemsProps {
  clubs: ClubType[];
  viewSize: number;
}

function useFavoriteItems({ clubs, viewSize }: FavoriteItemsProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const viewTotalPages = Math.ceil(clubs.length / viewSize);

  const viewData = clubs.slice(
    currentPage * viewSize,
    (currentPage + 1) * viewSize,
  );

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < viewTotalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return {
    currentPage,
    viewData,
    handleNext,
    handlePrev,
    viewTotalPages,
  };
}

export default useFavoriteItems;
