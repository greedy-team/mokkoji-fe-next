function HomeHeader() {
  return (
    <header className="flex flex-col items-center py-6 text-[#2E2E2E] lg:py-15">
      <h1 className="mb-4 w-fit bg-[linear-gradient(to_right,_#00E804_0%,_#3AE2EB_73%,_#3AA1EB_100%)] bg-clip-text p-4 text-5xl font-bold text-transparent md:text-6xl lg:text-8xl">
        Club, set, go!
      </h1>
      <p className="text-md font-bold lg:text-3xl">
        세종대의 다양한 <span className="text-[#00E804]">동아리</span>를
        한곳에서 만나보세요.
      </p>
      <p className="text-md font-bold lg:text-3xl">
        관심 있는 동아리를 찾고,{' '}
        <span className="text-[#00E804]">새로운 사람들</span>과 함께하세요!
      </p>
    </header>
  );
}

export default HomeHeader;
