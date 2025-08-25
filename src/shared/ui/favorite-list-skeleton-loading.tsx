import ItemListSkeletonLoading from './item-list-skeleton-loading';

function FavoriteListSkeletonLoading() {
  return (
    <>
      <h1 className="mb-5 w-full text-2xl font-bold text-[#00E457]">
        즐겨찾기 한 동아리 개
      </h1>
      <div className="mx-auto sm:w-4xl lg:w-6xl">
        <ItemListSkeletonLoading size={3} />
      </div>
    </>
  );
}
export default FavoriteListSkeletonLoading;
