import { Star } from 'lucide-react';
import { useState } from 'react';

interface StarRatingProps {
  maxStars?: number;
  value: number;
  onChange: (rating: number) => void;
}

function StarRating({ maxStars = 5, value, onChange }: StarRatingProps) {
  const [hovered, setHovered] = useState(0);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    starIndex: number,
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onChange(starIndex);
    }
  };

  return (
    <div className="flex">
      {Array.from({ length: maxStars }, (_, i) => {
        const starIndex = i + 1;
        const isFilled = hovered ? starIndex <= hovered : starIndex <= value;

        return (
          <div
            key={starIndex}
            role="button"
            tabIndex={0}
            className="cursor-pointer p-1"
            onMouseEnter={() => setHovered(starIndex)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onChange(starIndex)}
            onKeyDown={(e) => handleKeyDown(e, starIndex)}
            aria-label={`${starIndex}점`}
          >
            <Star
              className={`h-6 w-6 transition-colors duration-300 ${
                isFilled ? 'fill-[#00E457] text-[#00E457]' : 'text-gray-300'
              }`}
            />
          </div>
        );
      })}
    </div>
  );
}

export default StarRating;
