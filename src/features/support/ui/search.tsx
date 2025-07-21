import Image from 'next/image';

function Search() {
  return (
    <div className="mt-10 flex w-full flex-col items-center">
      <header className="mb-10 flex items-center gap-2">
        <Image
          src="/support/ghost.svg"
          alt="고객센터"
          width={40}
          height={40}
          className="cursor-pointer"
        />
        <h1 className="text-2xl font-bold">무엇을 도와드릴까요?</h1>
      </header>
      <div className="relative w-[500px]">
        <input
          type="text"
          placeholder="궁금한 점을 검색해주세요"
          className="w-full rounded-none border-0 border-b border-b-[#000000] pr-10 pb-5 focus:ring-0 focus:outline-none"
        />
        <Image
          src="/header/search.svg"
          alt="검색"
          width={20}
          height={20}
          className="absolute top-1/3 right-2 -translate-y-1/2 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default Search;
