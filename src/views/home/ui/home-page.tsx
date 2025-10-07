import HomeHeader from '@/entities/home/ui/home-header';
import NavigateClubList from '@/features/home/ui/navigate-clublist';
import HomeSearchWidget from '@/widgets/home/ui/home-search-widget';
import HomeDownButton from '@/features/home/ui/page-down-button';
import ClubCardWidget from '@/widgets/home/ui/club-card-widget';
import FeatureIntroduceWidget from '@/widgets/home/ui/feature-intoduce-widget';
import HelpCardWidget from '@/widgets/home/ui/help-card-widget';
import { Suspense } from 'react';
import SharedLoading from '@/shared/ui/loading';

async function HomePage() {
  return (
    <>
      <div className="mt-20 px-5 lg:mt-4 lg:px-[25%]">
        <HomeHeader />
        <HomeSearchWidget />
      </div>
      <div className="mt-10 mb-30 flex h-[72px] justify-center lg:mt-0 lg:mb-10">
        <HomeDownButton />
      </div>
      <div className="px-[10%]">
        <Suspense fallback={<SharedLoading />}>
          <ClubCardWidget />
        </Suspense>
      </div>
      <div className="bg-[linear-gradient(to_bottom,_#FFFFFF_0%,_#F8FAFB_5%,_#F8FAFB_95%,_#FFFFFF_100%)] px-[10%]">
        <FeatureIntroduceWidget />
      </div>
      <div className="px-[10%]">
        <HelpCardWidget />
      </div>
      <div className="fixed right-2 bottom-14 z-50 lg:right-8 lg:bottom-8">
        <NavigateClubList />
      </div>
    </>
  );
}

export default HomePage;
