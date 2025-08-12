import Image from 'next/image';

function Search() {
  return (
    <div className="mt-10 flex w-[85%] justify-center lg:w-full">
      <div className="w-full lg:w-[43%]">
        <header className="mb-8 ml-2 flex items-center gap-2 lg:ml-0">
          <Image
            src="/support/ghost.svg"
            alt="고객센터"
            width={40}
            height={40}
            className="h-8 w-8 cursor-pointer lg:h-10 lg:w-10"
          />
          <h1 className="text-2xl font-bold lg:text-3xl">
            무엇을 도와드릴까요?
          </h1>
        </header>
        <div className="relative mx-auto w-[95%] lg:w-[80%]">
          <input
            type="text"
            placeholder="궁금한 점을 검색해주세요"
            className="text-md w-full rounded-none border-0 border-b-2 border-b-gray-600 pr-10 pb-3 indent-1 focus:border-b-gray-800 focus:ring-0 focus:outline-none lg:text-lg"
          />
          <Image
            src="/header/search.svg"
            alt="검색"
            width={20}
            height={20}
            className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 cursor-pointer lg:h-5 lg:w-5"
          />
        </div>
      </div>
    </div>
  );
}

export default Search;
