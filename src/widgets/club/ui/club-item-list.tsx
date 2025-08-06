import { ClubAffiliation, ClubCategory } from '@/shared/model/type';
import Link from 'next/link';
import ClubItem from '@/entities/club/ui/club-item';
import getRecruitList from '@/widgets/recruit/api/getRecruitList';
import { RecruitItemListProps } from '@/widgets/recruit/model/type';
import ClubCustomErrorBoundary from './club-custom-error-boundary';

async function ClubItemList({ searchParams }: RecruitItemListProps) {
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
    return <ClubCustomErrorBoundary />;
  }

  return (
    <ul className="grid w-auto grid-cols-3 gap-4">
      {data?.map((item) => (
        <li key={item.id}>
          <Link href={`/recruit/${item.id}`}>
            <ClubItem
              title={item.name}
              category={item.category}
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

export default ClubItemList;
