'use client';

import { useOptimistic, startTransition } from 'react';
import { StarIcon, Star } from 'lucide-react';

function FavoriteThread({
  favorite,
  setFavoriteAction,
}: {
  favorite: boolean;
  setFavoriteAction: () => void;
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
      className="absolute right-5 bottom-5 cursor-pointer text-black transition-colors duration-200 disabled:opacity-50"
    >
      {optimisticFavorite ? (
        <StarIcon fill="black" stroke="black" className="h-6 w-6" />
      ) : (
        <Star className="h-6 w-6" />
      )}
    </button>
  );
}

export default FavoriteThread;
