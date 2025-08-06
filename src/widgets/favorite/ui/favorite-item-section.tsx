import ClubItem from '@/entities/club/ui/club-item';
import Link from 'next/link';
import Pagination from '@/shared/ui/pagination';
import { auth } from '@/auth';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import getFavoriteList from '../api/getFavoriteList';

interface FavoriteItemSectionProps {
  page: number;
  size: number;
}

async function FavoriteItemSection({ page, size }: FavoriteItemSectionProps) {
  const session = await auth();
  let data;
  let login;
  if (!session) {
    data = { clubs: [] };
    login = false;
  } else {
    try {
      data = await getFavoriteList({ page, size });
    } catch (error) {
      return <ErrorBoundaryUi />;
    }
    login = true;
  }
  return login ? (
    <>
      <h1 className="mb-5 text-base font-bold text-[#00E457]">
        즐겨찾기 한 동아리 {data.pagination?.totalElements}개
      </h1>
      <ul className="grid min-h-[360px] w-auto grid-cols-3 gap-4">
        {data.clubs.map((item) => (
          <Link href={`/club/${item.id}`} key={item.id}>
            <ClubItem
              key={item.id}
              title={item.name}
              description={item.description}
              clubId={String(item.id)}
              category={item.category}
              isFavorite={item.isFavorite}
              logo={item.logo}
            />
          </Link>
        ))}
      </ul>
      <Pagination
        page={page}
        size={size}
        total={data.pagination?.totalElements || 1}
      />
    </>
  ) : (
    <h1 className="mb-5 text-base font-bold text-[#00E457]">
      로그인 후 이용하실 수 있습니다.
    </h1>
  );
}

export default FavoriteItemSection;
