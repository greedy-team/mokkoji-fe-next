import FavoriteDateSection from '@/widgets/favorite/ui/favorite-date-section';
import FavoriteItemSection from '@/widgets/favorite/ui/favorite-item-section';
import ScrollTopButton from '@/shared/ui/scroll-top-button';
import { getSession } from '@/shared/lib/cookie-session';
import LoginRequired from '@/shared/ui/login-required';
import PageContainer from '@/shared/ui/page-container';
import ScrollProgressBar from '@/shared/ui/scroll-progress-bar';

async function FavoritePage() {
  const session = await getSession();

  if (!session) {
    return <LoginRequired />;
  }

  return (
    <>
      <PageContainer>
        <ScrollProgressBar />
        <FavoriteItemSection />
        <FavoriteDateSection />
      </PageContainer>
      <ScrollTopButton />
    </>
  );
}

export default FavoritePage;
