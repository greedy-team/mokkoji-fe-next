import HomeHeader from '@/entities/home/ui/home-header';
import NavigateClubList from '@/features/home/ui/navigate-clublist';
import HomeDownButton from '@/features/home/ui/page-down-button';
import SharedLoading from '@/shared/ui/loading';
import ClubCardWidget from '@/widgets/home/ui/club-card-widget';
import FeatureIntroduceWidget from '@/widgets/home/ui/feature-introduce-widget';
import HelpCardWidget from '@/widgets/home/ui/help-card-widget';
import HomeSearchWidget from '@/widgets/home/ui/home-search-widget';
import { Suspense } from 'react';

function DeskTopHomePage() {
  return (
    <>
      <section className="mt-4 px-[25%]">
        <HomeHeader />
        <HomeSearchWidget />
      </section>
      <div className="mb-10 flex h-[72px] justify-center">
        <HomeDownButton />
      </div>
      <section className="px-[10%]">
        <Suspense fallback={<SharedLoading />}>
          <ClubCardWidget />
        </Suspense>
      </section>
      <section className="bg-[linear-gradient(to_bottom,_#FFFFFF_0%,_#F8FAFB_5%,_#F8FAFB_95%,_#FFFFFF_100%)] px-[10%]">
        <FeatureIntroduceWidget />
      </section>
      <section className="px-[10%]">
        <HelpCardWidget />
      </section>
      <aside className="fixed right-8 bottom-8 z-50">
        <NavigateClubList />
      </aside>
    </>
  );
}

export default DeskTopHomePage;
