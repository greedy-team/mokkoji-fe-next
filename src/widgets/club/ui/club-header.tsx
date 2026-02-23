import ClubCategoryButtonSection from '@/entities/club/ui/club-category-button-section';
import ClubPageSearchbar from '@/entities/club/ui/clubpage-searchbar';
import AffiliationNavSelect from '@/shared/ui/affiliation-nav-select';

function ClubHeader() {
  return (
    <>
      <h1 className="text-text-primary mb-5 w-full text-center font-semibold sm:mb-7 sm:text-left sm:text-3xl lg:mt-9">
        전체 동아리
      </h1>
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="flex flex-col gap-3 sm:w-fit sm:gap-4">
          <ClubPageSearchbar />
          <ClubCategoryButtonSection />
        </div>
        <AffiliationNavSelect />
      </div>
    </>
  );
}

export default ClubHeader;
