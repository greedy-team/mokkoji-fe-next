import Image from 'next/image';

function SearchInput() {
  return (
    <div className="mt-10 flex w-full justify-center">
      <div className="w-[650px]">
        <h1 className="mb-8 text-3xl font-bold">검색</h1>
        <form
          action="/search"
          method="GET"
          className="relative mx-auto w-[500px]"
        >
          <input
            type="text"
            name="q"
            placeholder="동아리 명 또는 키워드를 입력해주세요."
            className="w-full rounded-none border-0 border-b-2 border-b-gray-600 pr-10 pb-3 text-lg focus:border-b-gray-800 focus:ring-0 focus:outline-none"
          />
          <button
            type="submit"
            className="absolute top-1/2 right-2 -translate-y-1/2"
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
