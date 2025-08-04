import Image from 'next/image';

interface StarRatingProps {
  rate: number;
}

function StarRating({ rate }: StarRatingProps) {
  const fullStars = Math.floor(rate);
  const hasHalfStar = rate - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex flex-1 gap-1">
      {Array(fullStars)
        .fill(0)
        .map((_) => (
          <Image
            key={crypto.randomUUID()}
            src="/detail/comment/starFilled.svg"
            alt="꽉찬 별"
            width={16}
            height={14}
          />
        ))}
      {hasHalfStar && (
        <Image
          src="/detail/comment/starHalf.svg"
          alt="반 별"
          width={16}
          height={14}
        />
      )}
      {Array(emptyStars)
        .fill(0)
        .map((_) => (
          <Image
            key={crypto.randomUUID()}
            src="/detail/comment/starempty.svg"
            alt="빈 별"
            width={16}
            height={14}
          />
        ))}
    </div>
  );
}

export default StarRating;
