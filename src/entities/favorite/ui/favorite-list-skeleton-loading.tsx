import ClubItemSkeleton from '../../club/ui/club-item-skeleton';

const SkeletonList = [1, 2, 3, 4, 5, 6];

function FavoriteListSkeletonLoading() {
  return (
    <>
      <h1 className="mb-5 w-full text-2xl font-bold text-[#00E457]">
        즐겨찾기 한 동아리 개
      </h1>
      <div className="mx-auto sm:w-4xl lg:w-6xl">
        <ul className="grid h-[380px] w-auto grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SkeletonList.map((item) => (
            <li key={item}>
              <ClubItemSkeleton />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
export default FavoriteListSkeletonLoading;
