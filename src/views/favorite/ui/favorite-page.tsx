import FavoriteDateSection from '@/widgets/favorite/ui/favorite-date-section';
import FavoriteListSection from '@/widgets/favorite/ui/favorite-list-section';
import ScrollTopButton from '@/shared/ui/scroll-top-button';
import getSession from '@/shared/lib/cookie-session';
import LoginRequired from '@/shared/ui/login-required';
import ScrollProgressBar from '@/shared/ui/scroll-progress-bar';

async function FavoritePage() {
  const session = await getSession();

  if (!session) {
    return <LoginRequired />;
  }

  return (
    <>
      <ScrollProgressBar />
      <div className="mx-auto w-full px-4 pb-16 sm:w-4xl sm:px-5 lg:w-6xl">
        <FavoriteListSection />
        <FavoriteDateSection />
      </div>
      <ScrollTopButton />
    </>
  );
}

export default FavoritePage;
