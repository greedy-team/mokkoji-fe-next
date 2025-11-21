import SectionHeader from '@/shared/ui/section-header';
import CategoryNavButton from '@/shared/ui/category-nav-button';

function RecruitHeader() {
  return (
    <SectionHeader
      title="전체 동아리"
      description={
        '관심 있는 동아리의 최신 모집 공고를\n한눈에 확인할 수 있어요.'
      }
    >
      <CategoryNavButton />
    </SectionHeader>
  );
}

export default RecruitHeader;
