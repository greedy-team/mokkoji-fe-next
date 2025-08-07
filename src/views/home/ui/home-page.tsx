import HomeHeader from '@/entities/home/ui/home-header';
import NavigateClubList from '@/features/home/ui/navigate-clublist';
import HomeSearchWidget from '@/widgets/home/ui/home-search-widget';
import HomeDownButton from '@/features/home/ui/page-down-button';
import ClubCardWidget from '@/widgets/home/ui/club-card-widget';
import FeatureIntroduceWidget from '@/widgets/home/ui/feature-intoduce-widget';
import HelpCardWidget from '@/widgets/home/ui/help-card-widget';
import ScrollTopButton from '@/features/recruit/ui/scroll-top-button';

async function HomePage() {
  return (
    <div className="min-h-screen">
      <div className="-mt-10 flex h-[calc(100vh-65px)] flex-col justify-center px-3 sm:-mt-16 sm:px-4 md:px-4 lg:-mt-20 lg:px-4 xl:px-6 2xl:px-[10%]">
        <HomeHeader />
        <HomeSearchWidget />
        <div className="mt-8 flex justify-center sm:mt-12">
          <HomeDownButton />
        </div>
      </div>
      <div className="px-3 sm:px-4 md:px-4 lg:px-4 xl:px-6 2xl:px-[8%]">
        <ClubCardWidget />
      </div>
      <div className="bg-[linear-gradient(to_bottom,_#FFFFFF_0%,_#F8FAFB_5%,_#F8FAFB_95%,_#FFFFFF_100%)] px-3 sm:px-4 md:px-4 lg:px-4 xl:px-6 2xl:px-[8%]">
        <FeatureIntroduceWidget />
      </div>
      <div className="px-3 sm:px-4 md:px-4 lg:px-4 xl:px-6 2xl:px-[8%]">
        <HelpCardWidget />
      </div>
      <div className="fixed right-2 bottom-14 z-50 lg:right-8 lg:bottom-8">
        <NavigateClubList />
      </div>
      <ScrollTopButton />
    </div>
  );
}

export default HomePage;
