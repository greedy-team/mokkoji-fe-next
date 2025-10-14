import Link from 'next/link';
import ClubItem from '@/entities/club/ui/club-item';
import getClubList from '@/widgets/recruit/api/getClubList';
import { searchParamsCache } from '@/app/(main)/club/search-params';
import { ClubCategory } from '@/shared/model/type';
import ClubCustomErrorBoundary from './club-custom-error-boundary';

async function ClubItemList() {
  const page = searchParamsCache.get('page');
  const size = searchParamsCache.get('size');
  const category = searchParamsCache.get('category');
  const keyword = searchParamsCache.get('keyword');

  const res = await getClubList({
    page,
    size,
    keyword,
    category: category.toUpperCase() as ClubCategory,
  });

  if (!res.ok) {
    return <ClubCustomErrorBoundary />;
  }
  if (res.data?.clubs.length === 0) {
    return (
      <p className="mt-30 w-full text-center text-sm font-bold text-[#00E457]">
        해당 동아리가 없습니다.
      </p>
    );
  }

  return (
    <ul className="grid w-auto grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {res.data?.clubs?.map((item) => (
        <li key={item.id}>
          <Link href={`/club/${item.id}`}>
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
