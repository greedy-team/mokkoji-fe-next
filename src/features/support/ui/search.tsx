import Image from 'next/image';

function Search() {
  return (
    <div className="mt-6 flex w-full flex-col items-center sm:mt-8 lg:mt-10">
      <header className="mb-6 flex items-center gap-2 sm:mb-8 lg:mb-10">
        <Image
          src="/support/ghost.svg"
          alt="고객센터"
          width={40}
          height={40}
          className="h-8 w-8 cursor-pointer sm:h-10 sm:w-10 lg:h-10 lg:w-10"
        />
        <h1 className="text-lg font-bold sm:text-xl lg:text-2xl">
          무엇을 도와드릴까요?
        </h1>
      </header>
      <div className="relative w-full max-w-[500px] px-4 sm:px-0">
        <input
          type="text"
          placeholder="궁금한 점을 검색해주세요"
          className="w-full rounded-none border-0 border-b border-b-[#000000] pr-10 pb-3 text-sm focus:ring-0 focus:outline-none sm:pb-4 sm:text-base lg:pb-5"
        />
        <Image
          src="/header/search.svg"
          alt="검색"
          width={20}
          height={20}
          className="absolute top-1/3 right-2 h-4 w-4 -translate-y-1/2 cursor-pointer sm:h-5 sm:w-5 lg:h-5 lg:w-5"
        />
      </div>
    </div>
  );
}

export default Search;
