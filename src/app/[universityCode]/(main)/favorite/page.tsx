import FavoritePage from '@/views/favorite/ui/favorite-page';

async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; size?: string }>;
}) {
  const { page, size } = await searchParams;

  return <FavoritePage page={Number(page) || 1} size={Number(size) || 6} />;
}

export default Page;
