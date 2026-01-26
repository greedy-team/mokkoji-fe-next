import Link from 'next/link';
import Pagination from '@/shared/ui/pagination';
import { auth } from '@/auth';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import cn from '@/shared/lib/utils';
import { searchParamsCache } from '@/app/(main)/favorite/search-params';
import FavoriteItem from '@/entities/favorite/ui/favorite-item';
import getFavoriteList from '../api/getFavoriteList';

async function FavoriteItemSection() {
  const page = searchParamsCache.get('page');
  const size = searchParamsCache.get('size');

  const session = await auth();
  let data;
  let login;

  if (!session) {
    data = { clubs: [] };
    login = false;
  } else {
    data = await getFavoriteList({ page, size });
    if (!data.ok || !data.data) {
      return <ErrorBoundaryUi />;
    }
    login = true;
  }

  return login ? (
    <>
      <h1 className="mt-10 mb-5 w-full text-sm font-bold lg:text-2xl">
        즐겨찾기 한 동아리{' '}
        <span className="text-[#00E457]">
          {data.data?.pagination.totalElements}개
        </span>
      </h1>
      {data.data?.clubs.length === 0 && (
        <p className="text-center font-semibold">
          동아리 즐겨찾기를 추가해보세요!
        </p>
      )}
      <ul
        className={cn(
          'grid w-auto grid-cols-1 gap-3 sm:h-[480px] lg:h-[390px] lg:grid-cols-3 lg:gap-4',
          data.data?.clubs.length === 0 && 'h-auto',
        )}
      >
        {data.data?.clubs.map((item) => (
          <li key={item.id}>
            <Link href={`/club/${item.id}`}>
              <FavoriteItem
                title={item.name}
                description={item.description || ''}
                clubId={String(item.id)}
                category={item.category}
                isFavorite={item.isFavorite}
                logo={item.logo}
                recruitStartDate={item.recruitStartDate}
                recruitEndDate={item.recruitEndDate}
                status={item.status}
                isAlwaysRecruiting={item.isAlwaysRecruiting}
              />
            </Link>
          </li>
        ))}
      </ul>

      <Pagination
        page={page}
        size={size}
        total={data.data?.pagination?.totalElements || 1}
      />
    </>
  ) : (
    <h1 className="mt-10 mb-5 text-2xl font-bold text-[#00E457]">
      로그인 후 이용하실 수 있습니다.
    </h1>
  );
}

export default FavoriteItemSection;
