import PaginationSkeleton from '@/shared/ui/pagination-skeleton';
import ClubItemSkeleton from '@/entities/club/ui/club-item-skeleton';

const SkeletonList = [1, 2, 3, 4, 5, 6];

function FavoriteListSkeletonLoading() {
  return (
    <>
      <h1 className="mt-10 mb-5 w-full text-2xl font-bold text-[#00E457]">
        즐겨찾기 한 동아리 개
      </h1>
      <div className="mx-auto w-full sm:w-4xl lg:w-6xl">
        <ul className="grid w-auto grid-cols-2 gap-4 sm:h-[480px] sm:grid-cols-2 lg:h-[390px] lg:grid-cols-3">
          {SkeletonList.map((item) => (
            <li key={item}>
              <ClubItemSkeleton />
            </li>
          ))}
        </ul>
      </div>
      <PaginationSkeleton />
    </>
  );
}
export default FavoriteListSkeletonLoading;
