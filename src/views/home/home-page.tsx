import HomeHeader from '@/entities/home/ui/home-header';
import NavigateClubList from '@/features/home/ui/navigate-clublist';
import HomeScrollSection from '@/entities/home/ui/scroll-section';
import HomeSearchWidget from '@/widgets/home/ui/home-search-widget';

async function HomePage() {
  return (
    <>
      <div className="px-5 lg:px-[25%]">
        <HomeHeader />
        <HomeSearchWidget />
      </div>
      <div>
        <HomeScrollSection />
      </div>
      <div className="fixed right-2 bottom-14 z-50 lg:right-8 lg:bottom-8">
        <NavigateClubList />
      </div>
    </>
  );
}

export default HomePage;
