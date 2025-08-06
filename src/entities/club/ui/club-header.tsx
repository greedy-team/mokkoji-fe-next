import NavSection from '@/shared/ui/nav-section';
import SectionHeader from '@/shared/ui/section-header';

function RecruitHeader() {
  return (
    <SectionHeader
      title="전체 동아리"
      description="우리 학교엔 이런 동아리들이 있어요."
    >
      <NavSection href="/club/all" />
    </SectionHeader>
  );
}

export default RecruitHeader;
