// app/recruit/RecruitItemList.tsx (Server Component)
import { ClubCategory } from '@/shared/model/type';
import { auth } from '@/auth';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import getClubRecruitList from '../api/getClubRecruitList';
import { RecruitItemListProps } from '../model/type';
import RecruitItemClientList from './recruit-item-client-list';

export default async function RecruitItemList({
  searchParams,
}: RecruitItemListProps) {
  const res = await getClubRecruitList({
    page: Number((await searchParams).page || 1),
    size: Number((await searchParams).size || 1000), // 전체 불러오기
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
      recruitments={res.data.recruitments}
      session={session || undefined}
    />
  );
}
