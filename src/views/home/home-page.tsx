import HomeHeader from '@/entities/home/ui/home-header';
import NavigateClubList from '@/features/home/ui/navigate-clublist';
import HomeScrollSection from '@/entities/home/ui/scroll-section';
import HomeSearchWidget from '@/widgets/home/ui/home-search-widget';

async function HomePage() {
  return (
    <div>
      <div className="px-[25%]">
        <HomeHeader />
        <HomeSearchWidget />
      </div>
      <div>
        <HomeScrollSection />
      </div>
      <div className="fixed right-8 bottom-8 z-50">
        <NavigateClubList />
      </div>
    </div>
  );
}

export default HomePage;
