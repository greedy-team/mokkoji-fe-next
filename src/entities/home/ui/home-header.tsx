function HomeHeader() {
  return (
    <header className="flex flex-col items-center py-8 text-[#2E2E2E]">
      <h1 className="mb-4 w-fit bg-[linear-gradient(to_right,_#00E804_0%,_#3AE2EB_73%,_#3AA1EB_100%)] bg-clip-text p-4 text-8xl font-bold text-transparent">
        Club, set, go!
      </h1>
      <p className="text-3xl font-bold">
        세종대의 다양한 <span className="text-[#00E804]">동아리</span>를
        한곳에서 만나보세요.
      </p>
      <p className="text-3xl font-bold">
        관심 있는 동아리를 찾고,{' '}
        <span className="text-[#00E804]">새로운 사람들</span>과 함께하세요!
      </p>
    </header>
  );
}

export default HomeHeader;
