'use client';

import handleSearch from '@/shared/model/handleSearch';
import Image from 'next/image';

function HomeBody() {
  return (
    <div className="mb-5 flex flex-col items-center py-5 lg:mb-[15px]">
      <div className="group relative w-[90%] lg:w-[80%]">
        <form
          action="/search"
          method="GET"
          onSubmit={handleSearch}
          className="text:md flex items-center justify-between gap-1 pb-2 lg:text-xl"
        >
          <input
            type="text"
            name="q"
            placeholder="어떤 동아리를 찾고 계신가요?"
            className="w-[90%] py-5 indent-2 outline-none focus:placeholder-gray-300"
          />
          <button type="submit">
            <Image
              src="/header/search.svg"
              alt="검색"
              width={25}
              height={25}
              className="cursor-pointer"
            />
          </button>
        </form>
        <span className="pointer-events-none absolute bottom-2 left-0 h-[3px] w-full bg-gray-200" />
        <span className="pointer-events-none absolute bottom-2 left-1/2 h-[3px] w-0 -translate-x-1/2 transform bg-gradient-to-r from-[#00E804] via-[#3AE2EB] to-[#3AA1EB] transition-all duration-300 ease-in-out group-focus-within:w-full" />
      </div>
    </div>
  );
}

export default HomeBody;
