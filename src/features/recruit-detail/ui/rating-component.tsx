import { Star } from 'lucide-react';
import { useState } from 'react';

interface StarRatingProps {
  maxStars?: number;
  value: number;
  onChange: (rating: number) => void;
}

function StarRating({ maxStars = 5, value, onChange }: StarRatingProps) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex gap-1">
      {Array.from({ length: maxStars }, (_, i) => {
        const starIndex = i + 1;
        const isFilled = hovered ? starIndex <= hovered : starIndex <= value;

        return (
          <Star
            key={starIndex}
            className={`h-6 w-6 cursor-pointer transition-colors ${
              isFilled ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
            onMouseEnter={() => setHovered(starIndex)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onChange(starIndex)}
          />
        );
      })}
    </div>
  );
}

export default StarRating;
