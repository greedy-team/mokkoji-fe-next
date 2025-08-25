import ClubSearchItemSkeleton from './club-search-item-skeleton';

const SkeletonList = [1, 2, 3, 4, 5];

function SearchListSkeletonLoading() {
  return (
    <div className="flex w-[85%] flex-col lg:w-[43%]">
      <section className="mt-13 mb-4">
        <span className="font-bold text-[#00E457]">건</span>
        <span className="text-black">의 검색결과</span>
      </section>
      {SkeletonList.map((item) => (
        <ClubSearchItemSkeleton key={item} />
      ))}
    </div>
  );
}

export default SearchListSkeletonLoading;
