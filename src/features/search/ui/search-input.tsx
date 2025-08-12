import Image from 'next/image';

function SearchInput() {
  return (
    <div className="mt-10 flex w-[85%] justify-center lg:w-full">
      <div className="w-full lg:w-[43%]">
        <h1 className="mb-8 ml-2 text-3xl font-bold lg:ml-0">동아리 검색</h1>
        <form
          action="/search"
          method="GET"
          className="relative mx-auto w-[95%] lg:w-[80%]"
        >
          <input
            type="text"
            name="q"
            placeholder="동아리 명 또는 키워드를 입력해주세요."
            className="text-md w-full rounded-none border-0 border-b-2 border-b-gray-600 pr-10 pb-3 indent-1 focus:border-b-gray-800 focus:ring-0 focus:outline-none lg:text-lg"
          />
          <button
            type="submit"
            className="absolute top-1/2 right-2 -translate-y-1/2 pb-2"
          >
            <Image
              src="/header/search.svg"
              alt="검색"
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchInput;
