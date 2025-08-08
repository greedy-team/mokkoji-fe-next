function HomeHeader() {
  return (
    <header className="flex flex-col items-center py-4 text-[#2E2E2E] sm:py-6 lg:py-8">
      <h1 className="mb-2 w-fit bg-[linear-gradient(to_right,_#00E804_0%,_#3AE2EB_73%,_#3AA1EB_100%)] bg-clip-text p-2 text-center text-4xl font-bold text-transparent sm:mb-4 sm:p-4 sm:text-6xl lg:text-8xl">
        Club, set, go!
      </h1>
      <p className="px-4 text-center text-lg font-bold sm:text-2xl lg:text-3xl">
        세종대의 다양한{' '}
        <span className="bg-[linear-gradient(to_right,_#00E804_0%,_#3AE2EB_73%,_#3AA1EB_100%)] bg-clip-text text-transparent">
          동아리
        </span>
        를 한곳에서 만나보세요.
      </p>
      <p className="px-4 text-center text-sm font-bold sm:text-lg lg:text-3xl">
        관심 있는 동아리를 찾고,{' '}
        <span className="bg-[linear-gradient(to_right,_#00E804_0%,_#3AE2EB_73%,_#3AA1EB_100%)] bg-clip-text text-transparent">
          새로운 사람들
        </span>
        과 함께하세요!
      </p>
    </header>
  );
}

export default HomeHeader;
