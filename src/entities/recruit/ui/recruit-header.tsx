import NavSection from '../../../features/recruit/ui/nav-section';

function RecruitHeader() {
  return (
    <header className="mb-8">
      <nav className="mb-3 flex flex-row justify-between">
        <h1 className="text-xl font-bold text-[#00E457]">모집 공고</h1>
        <NavSection />
      </nav>
      <h2 className="mt-2 mb-2 text-2xl font-bold text-[474747]">
        관심 있는 동아리의 최신공고를
        <br />
        한눈에 확인할 수 있어요.
      </h2>
    </header>
  );
}

export default RecruitHeader;
