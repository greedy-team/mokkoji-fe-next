function HomeHeader() {
  return (
    <header className="flex flex-col items-center py-8 text-[#2E2E2E]">
      <h1 className="bg-gradient-primary mb-4 w-fit bg-clip-text p-4 text-[120px] font-bold text-transparent">
        Club, set, go!
      </h1>
      <p className="text-[32px]">
        세종대의 모든{' '}
        <span className="bg-gradient-primary bg-clip-text font-bold text-transparent">
          동아리
        </span>
        ,
      </p>
      <p className="text-[32px] font-bold">
        <span className="bg-gradient-primary bg-clip-text text-transparent">
          모꼬지
        </span>
        에서 한눈에.
      </p>
    </header>
  );
}

export default HomeHeader;
