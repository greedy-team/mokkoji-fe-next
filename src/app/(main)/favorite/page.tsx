import FavoritePage from '@/views/favorite/ui/favorite-page';
import { SearchParams } from '@/views/favorite/model/type';
import { Suspense } from 'react';
import SharedLoading from '@/shared/ui/loading';

function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
  return (
    <Suspense fallback={<SharedLoading />}>
      <FavoritePage searchParams={searchParams} />
    </Suspense>
  );
}

export default Page;
