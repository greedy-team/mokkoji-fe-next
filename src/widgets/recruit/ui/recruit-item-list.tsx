import RecruitItem from '@/entities/recruit/ui/recruit-item';
import Link from 'next/link';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import { ClubAffiliation } from '@/shared/model/type';
import { RecruitItemListProps } from '../model/type';
import getClubRecruitList from '../api/getClubRecruitList';

async function RecruitItemList({ searchParams }: RecruitItemListProps) {
  let data;
  try {
    data = await getClubRecruitList({
      page: Number((await searchParams).page || 1),
      size: Number((await searchParams).size || 100),
      affiliation: (
        await searchParams
      ).affiliation?.toUpperCase() as ClubAffiliation,
    });
    if (data.recruitments.length === 0) {
      return (
        <p className="mt-30 w-auto text-center text-sm font-bold text-[#00E457] sm:w-[800px] lg:w-[1000px]">
          해당 동아리의 모집 공고가 없습니다.
        </p>
      );
    }
  } catch (error) {
    return <ErrorBoundaryUi />;
  }

  return (
    <ul className="grid w-auto grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data?.recruitments?.map((item) => (
        <li key={item.id}>
          <Link href={`/recruit/${item.id}`}>
            <RecruitItem
              title={item.club.name || ''}
              startDate={item.recruitStart}
              endDate={item.recruitEnd}
              description={item.club.description}
              isFavorite={item.isFavorite}
              logo={item.club.logo}
              clubId={String(item.id)}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default RecruitItemList;
