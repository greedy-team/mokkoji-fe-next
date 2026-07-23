'use client';

import useUniversityCode from '@/shared/hooks/useUniversityCode';
import Link from 'next/link';
import cn from '@/shared/lib/utils';
import { ClubType } from '@/shared/model/type';
import ClubItem from '@/entities/club/ui/club-item';
import Pagination from '@/shared/ui/pagination';
import ClientFavoriteButton from './ClientFavoriteButton';

interface FavoriteItemListProps {
  clubs: ClubType[];
  totalElements: number;
  page: number;
  size: number;
}

function FavoriteItemList({
  clubs,
  totalElements,
  page,
  size,
}: FavoriteItemListProps) {
  const universityCode = useUniversityCode();

  return (
    <>
      <h1 className="mt-10 mb-5 w-full text-sm font-bold lg:text-2xl">
        즐겨찾기 한 동아리{' '}
        <span className="text-[#00E457]">{totalElements}개</span>
      </h1>
      {clubs.length === 0 && (
        <p className="text-center font-semibold">
          동아리 즐겨찾기를 추가해보세요!
        </p>
      )}

      <ul
        className={cn(
          'grid w-auto grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-4',
          clubs.length === 0 && 'hidden',
        )}
      >
        {clubs.map((item) => (
          <li key={item.id}>
            <Link href={`/${universityCode}/club/${item.id}`}>
              <ClubItem
                name={item.name}
                startDate={item.recruitStartDate}
                endDate={item.recruitEndDate}
                description={item.description || ''}
                isFavorite={item.isFavorite || false}
                logo={item.logo}
                id={item.id}
                recruitStatus={item.recruitStatus}
                isAlwaysRecruiting={item.isAlwaysRecruiting}
                height={150}
                favoriteButton={
                  <ClientFavoriteButton
                    isFavorite={item.isFavorite || false}
                    clubId={item.id}
                    customClass="scale-100 mt-1"
                  />
                }
              />
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center justify-center">
        <Pagination page={page} size={size} total={totalElements} />
      </div>
    </>
  );
}

export default FavoriteItemList;
