import FavoritePage from '@/views/favorite/ui/favorite-page';
import { SearchParams } from '@/views/favorite/model/type';

function Page({ searchParams }: { searchParams: SearchParams }) {
  return <FavoritePage searchParams={searchParams} />;
}

export default Page;
