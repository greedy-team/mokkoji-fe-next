import RecruitItem from '@/entities/recruit/ui/recruit-item';
import { ClubAffiliation, ClubCategory } from '@/shared/model/type';
import Link from 'next/link';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import getRecruitList from '../api/getRecruitList';
import { RecruitItemListProps } from '../model/type';

async function RecruitItemList({ searchParams }: RecruitItemListProps) {
  let data;
  try {
    data = await getRecruitList(
      {
        page: Number((await searchParams).page || 1),
        size: Number((await searchParams).size || 10),
        keyword: (await searchParams).keyword?.toUpperCase() || '',
        category: (await searchParams).category?.toUpperCase() as ClubCategory,
        affiliation: (
          await searchParams
        ).affiliation?.toUpperCase() as ClubAffiliation,
        recruitStatus: (await searchParams).recruitStatus,
      },
      true,
    );
  } catch (error) {
    return <ErrorBoundaryUi />;
  }

  return (
    <ul className="grid w-auto grid-cols-3 gap-4">
      {data?.map((item) => (
        <li key={item.id}>
          <Link href={`/club/${item.id}`}>
            <RecruitItem
              title={item.name}
              startDate={item.recruitStartDate}
              endDate={item.recruitEndDate}
              description={item.description}
              isFavorite={item.isFavorite}
              logo={item.logo}
              clubId={String(item.id)}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default RecruitItemList;
