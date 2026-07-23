import FavoriteDateSection from '@/widgets/favorite/ui/favorite-date-section';
import FavoriteItemSection from '@/widgets/favorite/ui/favorite-item-section';
import ScrollTopButton from '@/shared/ui/scroll-top-button';
import { getSession } from '@/shared/lib/cookie-session';
import LoginRequired from '@/shared/ui/login-required';
import ScrollProgressBar from '@/shared/ui/scroll-progress-bar';
import { AsyncBoundaryWithQuery } from '@/shared/ui/AsyncBoundary';
import FavoriteListSkeletonLoading from '@/entities/favorite/ui/favorite-list-skeleton-loading';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';

async function FavoritePage() {
  const session = await getSession();

  if (!session) {
    return <LoginRequired />;
  }

  return (
    <>
      <ScrollProgressBar />
      <div className="mx-auto w-full px-4 pb-16 sm:w-4xl sm:px-5 lg:w-6xl">
        <AsyncBoundaryWithQuery
          pendingFallback={<FavoriteListSkeletonLoading />}
          rejectedFallback={<ErrorBoundaryUi />}
        >
          <FavoriteItemSection />
        </AsyncBoundaryWithQuery>
        <FavoriteDateSection />
      </div>
      <ScrollTopButton />
    </>
  );
}

export default FavoritePage;
