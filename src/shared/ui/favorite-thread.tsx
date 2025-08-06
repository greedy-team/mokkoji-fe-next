'use client';

import { useOptimistic, startTransition } from 'react';
import { StarIcon, Star } from 'lucide-react';

function FavoriteThread({
  favorite,
  setFavoriteAction,
  customClass,
}: {
  favorite: boolean;
  setFavoriteAction: () => void;
  customClass?: string;
}) {
  const [optimisticFavorite, toggleFavorite] = useOptimistic(
    favorite,
    (state: boolean) => !state,
  );

  const toggleAction = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    startTransition(async () => {
      toggleFavorite(favorite);
      setFavoriteAction();
    });
  };

  return (
    <button
      onClick={toggleAction}
      aria-label="즐겨찾기 토글"
      className={
        customClass ||
        'absolute right-5 bottom-5 cursor-pointer text-black transition-colors duration-200 disabled:opacity-50'
      }
    >
      {optimisticFavorite ? (
        <StarIcon
          fill="black"
          stroke="black"
          className="h-6 w-6"
          strokeWidth={1}
        />
      ) : (
        <Star className="h-6 w-6" strokeWidth={1} />
      )}
    </button>
  );
}

export default FavoriteThread;
