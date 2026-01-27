import FavoriteDateSection from '@/widgets/favorite/ui/favorite-date-section';
import FavoriteItemSection from '@/widgets/favorite/ui/favorite-item-section';
import ScrollTopButton from '@/shared/ui/scroll-top-button';
import { auth } from '@/auth';
import LoginRequired from './login-required';

async function FavoritePage() {
  const session = await auth();

  if (!session) {
    return <LoginRequired />;
  }

  return (
    <>
      <div className="mx-auto w-full px-4 sm:w-4xl sm:px-5 lg:w-6xl">
        <FavoriteItemSection />
        <FavoriteDateSection />
      </div>
      <ScrollTopButton />
    </>
  );
}

export default FavoritePage;
