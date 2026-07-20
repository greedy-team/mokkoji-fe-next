import PaginationSkeleton from '@/shared/ui/pagination-skeleton';
import ClubItemSkeleton from '@/entities/club/ui/club-item-skeleton';

const SkeletonList = [1, 2, 3, 4, 5, 6];

function FavoriteListSkeletonLoading() {
  return (
    <>
      <h1 className="mt-10 mb-5 w-full text-sm font-bold lg:text-2xl">
        즐겨찾기 한 동아리 <span className="text-[#00E457]">0개</span>
      </h1>
      <ul className="grid w-auto grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-4">
        {SkeletonList.map((item) => (
          <li key={item}>
            <ClubItemSkeleton />
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center justify-center">
        <PaginationSkeleton />
      </div>
    </>
  );
}
export default FavoriteListSkeletonLoading;
