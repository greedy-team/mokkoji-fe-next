import Image from 'next/image';

function HomeSearch() {
  return (
    <div className="group relative mx-auto w-full max-w-[619px]">
      <form
        action="/search"
        method="GET"
        className="flex items-center justify-between gap-1 pb-2 text-base sm:text-lg lg:text-xl"
      >
        <input
          type="text"
          name="q"
          placeholder="어떤 동아리를 찾고 계신가요?"
          className="w-[90%] py-3 indent-2 text-sm outline-none focus:placeholder-gray-300 sm:py-4 sm:text-base lg:py-5"
        />
        <button type="submit">
          <Image
            src="/header/search.svg"
            alt="검색"
            width={25}
            height={25}
            className="h-5 w-5 cursor-pointer sm:h-6 sm:w-6 lg:h-6 lg:w-6"
          />
        </button>
      </form>
      <span className="pointer-events-none absolute bottom-2 left-0 h-[3px] w-full bg-gray-200" />
      <span className="pointer-events-none absolute bottom-2 left-1/2 h-[3px] w-0 -translate-x-1/2 transform bg-gradient-to-r from-[#00E804] via-[#3AE2EB] to-[#3AA1EB] transition-all duration-300 ease-in-out group-focus-within:w-full" />
    </div>
  );
}

export default HomeSearch;
