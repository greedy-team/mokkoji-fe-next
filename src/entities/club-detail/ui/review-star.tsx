import Image from 'next/image';
import detailCommentStarEmptyIcon from '@/shared/assets/images/detail/comment/starEmpty.svg';
import detailCommentStarFilledIcon from '@/shared/assets/images/detail/comment/starFilled.svg';
import detailCommentStarHalfIcon from '@/shared/assets/images/detail/comment/starHalf.svg';

interface StarRatingProps {
  rate: number;
}

function StarRating({ rate }: StarRatingProps) {
  const fullStars = Math.floor(rate);
  const isHalfStar = rate - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (isHalfStar ? 1 : 0);

  return (
    <div className="flex flex-1 gap-1">
      {Array(fullStars)
        .fill(0)
        .map((_) => (
          <Image
            key={crypto.randomUUID()}
            src={detailCommentStarFilledIcon}
            alt="꽉찬 별"
            width={16}
            height={14}
          />
        ))}
      {isHalfStar && (
        <Image
          src={detailCommentStarHalfIcon}
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
            src={detailCommentStarEmptyIcon}
            alt="빈 별"
            width={16}
            height={14}
          />
        ))}
    </div>
  );
}

export default StarRating;
