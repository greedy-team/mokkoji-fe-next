import { ClubAffiliation, ClubCategory } from '@/shared/model/type';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import { searchParamsCache } from '@/app/(main)/club/search-params';
import getClubRecruitList from '../api/getClubRecruitList';
import ClubItemClientList from './club-item-client-list';

async function ClubItemList() {
  const page = searchParamsCache.get('page');
  const size = searchParamsCache.get('size');
  const category = searchParamsCache.get('category');
  const affiliation = searchParamsCache.get('affiliation');
  const res = await getClubRecruitList({
    page,
    size,
    category: category as ClubCategory,
    affiliation: affiliation as ClubAffiliation,
  });

  if (!res.ok || !res.data) {
    return <ErrorBoundaryUi />;
  }

  if (res.data.recruitments.length === 0) {
    return (
      <p className="mt-30 w-full text-center text-sm font-bold text-[#00E457]">
        모집 공고가 없습니다.
      </p>
    );
  }

  return <ClubItemClientList recruitments={res.data.recruitments} />;
}

export default ClubItemList;
