import Image from 'next/image';

function HomeSearch() {
  return (
    <form
      action="/search"
      method="GET"
      className="text-md flex w-[82%] items-center justify-between gap-1 border-b-3 transition-colors focus-within:border-[#00E804] lg:text-xl"
    >
      <input
        type="text"
        name="q"
        placeholder="어떤 동아리를 찾고 계신가요?"
        className="w-[90%] py-2 indent-2 outline-none focus:placeholder-gray-300 lg:py-5"
      />
      <button type="submit">
        <Image
          src="/header/search.svg"
          alt="검색"
          width={25}
          height={25}
          className="h-5 w-5 cursor-pointer lg:h-6 lg:w-6"
        />
      </button>
    </form>
  );
}

export default HomeSearch;
