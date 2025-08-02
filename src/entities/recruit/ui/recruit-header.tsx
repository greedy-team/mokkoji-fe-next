import SectionHeader from '@/shared/ui/section-header';
import NavSection from '@/shared/ui/nav-section';

function RecruitHeader() {
  return (
    <SectionHeader
      title="모집 공고"
      description={
        '관심 있는 동아리의 최신 모집 공고를\n한눈에 확인할 수 있어요.'
      }
    >
      <NavSection href="/recruit" />
    </SectionHeader>
  );
}

export default RecruitHeader;
