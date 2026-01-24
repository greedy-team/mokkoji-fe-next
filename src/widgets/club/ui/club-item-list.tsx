import { ClubAffiliation, ClubCategory } from '@/shared/model/type';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import { searchParamsCache } from '@/app/(main)/club/search-params';
import NumberPagination from '@/shared/ui/numberPagination';
import getClubList from '../api/getClubList';
import ClubItemClientList from './club-item-client-list';

async function ClubItemList() {
  const page = Number(searchParamsCache.get('page') ?? 1);
  const size = 9;
  const category = searchParamsCache.get('category');
  const affiliation = searchParamsCache.get('affiliation');
  const res = await getClubList({
    page,
    size,
    category: category as ClubCategory,
    affiliation: affiliation as ClubAffiliation,
  });

  if (!res.ok || !res.data) {
    return <ErrorBoundaryUi />;
  }

  if (res.data.clubs.length === 0) {
    return (
      <p className="mt-30 w-full text-center text-sm font-bold text-[#00E457]">
        모집 공고가 없습니다.
      </p>
    );
  }

  return (
    <>
      <ClubItemClientList clubs={res.data.clubs} />
      <NumberPagination page={page} totalPages={res.data.page.totalPages} />
    </>
  );
}

export default ClubItemList;
