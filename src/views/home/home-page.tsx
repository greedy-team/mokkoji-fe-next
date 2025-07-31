import HomeHeader from '@/entities/home/ui/home-header';
import NavigateClubList from '@/features/home/ui/navigate-clublist';
import HomeScrollSection from '@/entities/home/ui/scroll-section';
import HomeSearchWidget from '@/widgets/home/ui/home-search-widget';
import HomeDownButton from '@/features/home/ui/page-down-button';
import ClubCardWidget from '@/widgets/home/ui/club-card-widget';
import FeatureIntroduceWidget from '@/widgets/home/ui/feature-intoduce-widget';
import HelpCardWidget from '@/widgets/home/ui/help-card-widget';

async function HomePage() {
  return (
    <div>
      <div className="px-[25%]">
        <HomeHeader />
        <HomeSearchWidget />
      </div>
      <div className="mb-10 flex h-[72px] justify-center">
        <HomeDownButton />
      </div>
      <div className="px-[10%]">
        <ClubCardWidget />
      </div>
      <div className="bg-[linear-gradient(to_bottom,_#FFFFFF_0%,_#F8FAFB_5%,_#F8FAFB_95%,_#FFFFFF_100%)] px-[10%]">
        <FeatureIntroduceWidget />
      </div>
      <div className="px-[10%]">
        <HelpCardWidget />
      </div>
      <div className="fixed right-8 bottom-8 z-50">
        <NavigateClubList />
      </div>
    </div>
  );
}

export default HomePage;
