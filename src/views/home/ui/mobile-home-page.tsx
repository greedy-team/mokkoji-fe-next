import MobileHomeHeader from '@/entities/home/ui/mobile-home-header';
import NavigateClubList from '@/features/home/ui/navigate-clublist';
import HomeDownButton from '@/features/home/ui/page-down-button';
import SharedLoading from '@/shared/ui/loading';
import ClubCardMobileWidget from '@/widgets/home/ui/club-card-mobile-widget';
import HomeSearchWidget from '@/widgets/home/ui/home-search-widget';
import { Suspense } from 'react';

function MobileHomePage() {
  return (
    <>
      <div className="mt-20 px-5">
        <MobileHomeHeader />
        <HomeSearchWidget />
      </div>
      <div className="mt-4 mb-30 flex h-[72px] justify-center">
        <HomeDownButton />
      </div>
      <section className="px-5">
        <ClubCardMobileWidget />
      </section>
      <div className="fixed right-2 bottom-24 z-50">
        <NavigateClubList />
      </div>
    </>
  );
}

export default MobileHomePage;
