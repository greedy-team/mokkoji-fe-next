import HomeHeader from '@/entities/home/ui/home-header';
import HomeSearchWidget from '@/widgets/home/ui/home-search-widget';

function HomePage() {
  return (
    <div className="px-[25%]">
      <HomeHeader />
      <HomeSearchWidget />
    </div>
  );
}

export default HomePage;
