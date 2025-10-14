import { ClubCategory } from '@/shared/model/type';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import { headers } from 'next/headers';
import { searchParamsCache } from '@/app/(main)/recruit/search-params';
import RecruitItemClientList from './recruit-item-client-list';
import getClubRecruitList from '../api/getClubRecruitList';

function getInitialLayout(userAgent: string) {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
  const isTablet =
    /iPad|Android/i.test(userAgent) && !/Mobile/i.test(userAgent);

  if (isMobile) return { columns: 1, cardHeight: 140 };
  if (isTablet) return { columns: 2, cardHeight: 140 };
  return { columns: 3, cardHeight: 198 };
}

async function RecruitItemList() {
  const page = searchParamsCache.get('page');
  const size = searchParamsCache.get('size');
  const category = searchParamsCache.get('category');

  const headersList = headers();
  const userAgent = (await headersList).get('user-agent') || '';
  const { columns, cardHeight } = getInitialLayout(userAgent);

  const res = await getClubRecruitList({
    page,
    size,
    category: category.toUpperCase() as ClubCategory,
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

  return (
    <RecruitItemClientList
      recruitments={res.data.recruitments}
      initialColumns={columns}
      initialCardHeight={cardHeight}
    />
  );
}

export default RecruitItemList;
