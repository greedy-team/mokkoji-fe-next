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
      {/* <div className="group relative w-[80%] lg:w-[38%]">
        <input
          type="text"
          placeholder="궁금한 점을 검색해주세요"
          className="w-full rounded-none pr-10 pb-6 indent-2 outline-none focus:ring-0 focus:outline-none"
        />
        <Image
          src="/header/search.svg"
          alt="검색"
          width={20}
          height={20}
          className="absolute top-1/3 right-2 -translate-y-1/2 cursor-pointer"
        />
        <span className="pointer-events-none absolute bottom-2 left-0 h-[3px] w-full bg-gray-200" />
        <span className="pointer-events-none absolute bottom-2 left-1/2 h-[3px] w-0 -translate-x-1/2 transform bg-gradient-to-r from-[#00E804] via-[#3AE2EB] to-[#3AA1EB] transition-all duration-300 ease-in-out group-focus-within:w-full" />
      </div> */}
    </div>
  );
}

export default Search;
