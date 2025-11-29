import ClubCategoryButtonSection from '@/entities/club/ui/club-category-button-section';
import AffiliationNavSelect from '@/shared/ui/affiliation-nav-select';

function ClubHeader() {
  return (
    <>
      <h1 className="text-text-primary mb-10 text-3xl font-bold">
        전체 동아리
      </h1>
      <div className="mb-10 flex justify-between gap-20">
        <ClubCategoryButtonSection />
        <AffiliationNavSelect />
      </div>
    </>
  );
}

export default ClubHeader;
