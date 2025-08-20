import CategoryNavButton from '@/shared/ui/category-nav-button';
import SectionHeader from '@/shared/ui/section-header';

function RecruitHeader() {
  return (
    <SectionHeader
      title="전체 동아리"
      description="우리 학교엔 이런 동아리들이 있어요."
    >
      <CategoryNavButton />
    </SectionHeader>
  );
}

export default RecruitHeader;
