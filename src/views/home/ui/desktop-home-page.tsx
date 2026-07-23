import HomeHeader from '@/entities/home/ui/home-header';
import NavigateClubList from '@/features/home/ui/navigate-clublist';
import HomeDownButton from '@/features/home/ui/page-down-button';
import SharedLoading from '@/shared/ui/loading';
import ClubCardWidget from '@/widgets/home/ui/club-card-widget';
import FeatureIntroduceWidget from '@/widgets/home/ui/feature-introduce-widget';
import HelpCardWidget from '@/widgets/home/ui/help-card-widget';
import HomeSearchWidget from '@/widgets/home/ui/home-search-widget';
import { Suspense } from 'react';

interface DeskTopHomePageProps {
  universityName: string;
  universityCode: string;
}

function DeskTopHomePage({
  universityName,
  universityCode,
}: DeskTopHomePageProps) {
  return (
    <>
      <section className="mx-auto mt-4 flex min-h-[calc(100vh-200px)] w-fit flex-col justify-center">
        <HomeHeader universityName={universityName} />
        <HomeSearchWidget />
      </section>
      <div className="mb-10 flex h-[72px] justify-center">
        <HomeDownButton />
      </div>
      <section className="px-[10%]">
        <Suspense fallback={<SharedLoading />}>
          <ClubCardWidget
            universityName={universityName}
            universityCode={universityCode}
          />
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
