import ClubCategoryButtonSection from '@/entities/club/ui/club-category-button-section';
import CategoryNavButton from '@/shared/ui/category-nav-button';

function ClubHeader() {
  return (
    <>
      <h1 className="text-primary-500 mb-10 text-3xl font-bold">전체 동아리</h1>
      <div className="mb-10 flex justify-between">
        <ClubCategoryButtonSection />
        <CategoryNavButton />
      </div>
    </>
  );
}

export default ClubHeader;
