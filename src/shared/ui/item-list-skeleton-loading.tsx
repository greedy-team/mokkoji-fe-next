import ClubItemSkeleton from '@/shared/ui/club-item-skeleton';
import SectionHeader from './section-header';

const SkeletonList = [1, 2, 3, 4, 5, 6, 7, 8, 9];

interface ItemListSkeletonLoadingProps {
  title: string;
  description: string;
  size?: number;
}

function ItemListSkeletonLoading({
  title,
  description,
  size = 9,
}: ItemListSkeletonLoadingProps) {
  const splicedSkeletonList = SkeletonList.slice(
    0,
    Math.min(size, SkeletonList.length),
  );
  return (
    <>
      <SectionHeader title={title} description={description} />
      <ul className="grid w-auto grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {splicedSkeletonList.map((item) => (
          <li key={item}>
            <ClubItemSkeleton />
          </li>
        ))}
      </ul>
    </>
  );
}

export default ItemListSkeletonLoading;
