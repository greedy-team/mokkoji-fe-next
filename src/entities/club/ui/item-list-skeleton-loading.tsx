import ClubItemSkeleton from '@/entities/club/ui/club-item-skeleton';

const SkeletonList = [1, 2, 3, 4, 5, 6, 7, 8, 9];

interface ItemListSkeletonLoadingProps {
  size?: number;
}

function ItemListSkeletonLoading({ size = 9 }: ItemListSkeletonLoadingProps) {
  const splicedSkeletonList = SkeletonList.slice(
    0,
    Math.min(size, SkeletonList.length),
  );
  return (
    <ul className="grid w-auto grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {splicedSkeletonList.map((item) => (
        <li key={item} className="w-full">
          <ClubItemSkeleton />
        </li>
      ))}
    </ul>
  );
}

export default ItemListSkeletonLoading;
