import Image from 'next/image';

function HomeSearch() {
  return (
    <form
      action="/search"
      method="GET"
      className="flex w-[619px] items-center justify-between gap-1 border-b-3 text-xl transition-colors focus-within:border-[#00E804]"
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
  );
}

export default HomeSearch;
