import Image from 'next/image';

function Search() {
  return (
    <div className="flex w-full flex-col items-center">
      <header className="mb-8 flex items-center gap-3">
        <Image
          src="/support/ghost.svg"
          alt="고객센터"
          width={40}
          height={40}
          className="h-10 w-10 cursor-pointer"
        />
        <h1 className="text-2xl font-bold">무엇을 도와드릴까요?</h1>
      </header>
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="궁금한 점을 검색해주세요"
          className="w-full rounded-none border-0 border-b border-b-[#000000] pr-10 pb-4 text-base focus:ring-0 focus:outline-none"
        />
        <Image
          src="/header/search.svg"
          alt="검색"
          width={20}
          height={20}
          className="absolute top-1/2 right-2 h-5 w-5 -translate-y-1/2 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default Search;
