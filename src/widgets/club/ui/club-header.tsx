import ClubCategoryButtonSection from '@/entities/club/ui/club-category-button-section';
import AffiliationNavSelect from '@/shared/ui/affiliation-nav-select';

function ClubHeader() {
  return (
    <>
      <h1 className="text-text-primary mb-5 w-full text-center font-semibold sm:mb-9 sm:text-left sm:text-3xl sm:font-bold lg:mt-9">
        전체 동아리
      </h1>
      <div className="flex flex-col gap-3 sm:gap-4">
        <ClubCategoryButtonSection />
        <AffiliationNavSelect />
      </div>
    </>
  );
}

export default ClubHeader;
