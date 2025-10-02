import { ClubCategory } from '@/shared/model/type';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import { auth } from '@/auth';
import { RecruitmentSearchParams } from '@/shared/model/recruit-type';
import RecruitItemClientList from './recruit-item-client-list';
import getClubRecruitList from '../api/getClubRecruitList';

async function RecruitItemList({
  searchParams,
}: {
  searchParams: Promise<RecruitmentSearchParams>;
}) {
  const res = await getClubRecruitList({
    page: Number((await searchParams).page || 1),
    size: Number((await searchParams).size || 1000),
    category: (await searchParams).category?.toUpperCase() as ClubCategory,
  });
  const session = await auth();

  if (!res.ok || !res.data) {
    return <ErrorBoundaryUi />;
  }

  if (res.data?.recruitments.length === 0) {
    return (
      <p className="mt-30 w-full text-center text-sm font-bold text-[#00E457]">
        모집 공고가 없습니다.
      </p>
    );
  }

  return (
    <RecruitItemClientList
      recruitments={res.data?.recruitments}
      session={session}
    />
  );
}

export default RecruitItemList;
