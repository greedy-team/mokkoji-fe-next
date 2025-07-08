import HomeHeader from '@/entities/home/ui/home-header';
import HomeScrollSection from '@/entities/home/ui/scroll-section';
import HomeSearchWidget from '@/widgets/home/ui/home-search-widget';
import getRecruitList from '@/widgets/recruit/api/getRecruitList';

async function HomePage() {
  const data = await getRecruitList({
    page: 1,
    size: 14,
    keyword: '',
    category: undefined,
    affiliation: undefined,
    recruitStatus: undefined,
  });

  return (
    <div>
      <div className="px-[25%]">
        <HomeHeader />
        <HomeSearchWidget />
      </div>
      <div>
        <HomeScrollSection data={data} />
      </div>
    </div>
  );
}

export default HomePage;
