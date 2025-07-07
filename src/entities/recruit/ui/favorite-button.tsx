'use client';

import { useState } from 'react';
import { StarIcon, Star } from 'lucide-react';

function FavoriteButton({ isFavorite }: { isFavorite: boolean }) {
  const [filled, setFilled] = useState(isFavorite);

  return (
    <button
      onClick={() => setFilled(!filled)}
      aria-label="즐겨찾기 토글"
      className="absolute right-5 bottom-5 text-black transition-colors duration-200"
    >
      {filled ? (
        <StarIcon fill="black" stroke="black" className="h-6 w-6" />
      ) : (
        <Star className="h-6 w-6" />
      )}
    </button>
  );
}

export default FavoriteButton;
