function HomeHeader() {
  return (
    <header className="flex flex-col items-center py-8 text-[#2E2E2E]">
      <h1 className="bg-gradient-primary mb-4 w-fit bg-clip-text p-4 text-5xl font-bold text-transparent lg:text-8xl">
        Club, set, go!
      </h1>
      <p className="text-md text-text-primary font-bold lg:text-3xl">
        세종대의 다양한 동아리를{' '}
        <span className="bg-gradient-primary bg-clip-text text-transparent">
          모꼬지
        </span>
        에서 만나보세요.
      </p>
      <p className="text-md text-text-primary font-bold lg:text-3xl">
        관심 있는 동아리를 찾고,{' '}
        <span className="bg-gradient-primary bg-clip-text text-transparent">
          새로운 사람들
        </span>
        과 함께하세요!
      </p>
    </header>
  );
}

export default HomeHeader;
