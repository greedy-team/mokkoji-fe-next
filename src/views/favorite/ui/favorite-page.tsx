import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import FavoriteDateSection from '@/widgets/favorite/ui/favorite-date-section';
import FavoriteItemSection from '@/widgets/favorite/ui/favorite-item-section';
import favoriteQueries from '@/widgets/favorite/api/queries';
import getServerFavoriteList from '@/widgets/favorite/api/getServerFavoriteList';
import ScrollTopButton from '@/shared/ui/scroll-top-button';
import { getSession } from '@/shared/lib/cookie-session';
import getServerQueryClient from '@/shared/lib/get-query-client';
import LoginRequired from '@/shared/ui/login-required';
import ScrollProgressBar from '@/shared/ui/scroll-progress-bar';
import { AsyncBoundaryWithQuery } from '@/shared/ui/AsyncBoundary';
import FavoriteListSkeletonLoading from '@/entities/favorite/ui/favorite-list-skeleton-loading';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';

interface FavoritePageProps {
  page: number;
  size: number;
}

async function FavoritePage({ page, size }: FavoritePageProps) {
  const session = await getSession();

  if (!session) {
    return <LoginRequired />;
  }

  const queryClient = getServerQueryClient();
  await queryClient.prefetchQuery({
    queryKey: favoriteQueries.list({ page, size }).queryKey,
    queryFn: () => getServerFavoriteList({ page, size }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
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
    </HydrationBoundary>
  );
}

export default FavoritePage;
