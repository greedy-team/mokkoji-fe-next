import Image from 'next/image';

function HomeBody() {
  return (
    <div className="mb-5 flex flex-col items-center py-5 lg:mb-[15px]">
      <div className="group relative w-[65%] lg:w-[80%]">
        <form
          action="/search"
          method="GET"
          className="flex items-center justify-between gap-1 pb-2 text-xs lg:text-xl"
        >
          <input
            type="text"
            required
            name="q"
            placeholder="어떤 동아리를 찾고 계신가요?"
            className="w-[90%] py-5 outline-none focus:placeholder-gray-300 lg:indent-2"
          />
          <button type="submit">
            <Image
              src="/header/search.svg"
              alt="검색"
              width={25}
              height={25}
              className="h-[17px] w-[17px] cursor-pointer lg:h-[25px] lg:w-[25px]"
            />
          </button>
        </form>
        <span className="pointer-events-none absolute bottom-4 left-0 h-[2px] w-full bg-gray-200 lg:bottom-2 lg:h-[3px]" />
        <span className="pointer-events-none absolute bottom-4 left-1/2 h-[2px] w-0 -translate-x-1/2 transform bg-gradient-to-r from-[#00E804] via-[#3AE2EB] to-[#3AA1EB] transition-all duration-300 ease-in-out group-focus-within:w-full lg:bottom-2 lg:h-[3px]" />
      </div>
    </div>
  );
}

export default HomeBody;
