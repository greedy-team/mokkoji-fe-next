import CategoryNavButton from '@/shared/ui/category-nav-button';
import SectionHeader from '@/shared/ui/section-header';
import ClubCategoryButtonSection from './club-category-button-section';

function ClubHeader() {
  return (
    <SectionHeader
      title="전체 동아리"
      description="우리 학교엔 이런 동아리들이 있어요."
    >
      {/* <ClubCategoryButtonSection /> */}
      <CategoryNavButton />
    </SectionHeader>
  );
}

export default ClubHeader;
