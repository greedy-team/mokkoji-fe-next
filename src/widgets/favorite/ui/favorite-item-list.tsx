'use client';

import Link from 'next/link';
import Image from 'next/image';
import cn from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { ClubType } from '@/shared/model/type';
import ClubItem from '@/entities/club/ui/club-item';
import { useBreakpoint } from '@/shared/hooks/useMediaQuery';
import useFavoriteItems from '../util/useFavoriteItems';

interface FavoriteItemListProps {
  clubs: ClubType[];
  totalElements: number;
}

const MOBILE_SIZE = 3;
const DESKTOP_SIZE = 6;

function FavoriteItemList({ clubs, totalElements }: FavoriteItemListProps) {
  const isDesktopView = useBreakpoint('lg');
  const viewSize = isDesktopView ? DESKTOP_SIZE : MOBILE_SIZE;
  const { currentPage, viewData, handleNext, handlePrev, viewTotalPages } =
    useFavoriteItems({
      clubs,
      viewSize,
    });

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
        {viewData.map((item) => (
          <li key={`mobile-${item.id}`}>
            <Link href={`/club/${item.id}`}>
              <ClubItem
                name={item.name}
                startDate={item.recruitStartDate}
                endDate={item.recruitEndDate}
                description={item.description || ''}
                favorite={item.isFavorite || false}
                logo={item.logo}
                id={item.id}
                recruitStatus={item.recruitStatus}
                isAlwaysRecruiting={item.isAlwaysRecruiting}
                height={150}
              />
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center justify-center gap-4">
        <Button
          type="button"
          onClick={handlePrev}
          disabled={currentPage === 0}
          className={cn(
            'h-[40px] w-[40px] rounded-full border border-[#CFCFCF] bg-white',
            currentPage === 0 && 'cursor-not-allowed opacity-50',
          )}
        >
          <Image
            src="/favorite/prev.svg"
            alt="prev"
            width={60}
            height={60}
            className="scale-125"
          />
        </Button>
        <Button
          type="button"
          onClick={() => handleNext()}
          disabled={currentPage >= viewTotalPages - 1}
          className={cn(
            'h-[40px] w-[40px] rounded-full border border-[#CFCFCF] bg-white',
            currentPage >= viewTotalPages - 1 &&
              'cursor-not-allowed opacity-50',
          )}
        >
          <Image
            src="/favorite/next.svg"
            alt="next"
            width={60}
            height={60}
            className="scale-125"
          />
        </Button>
      </div>
    </>
  );
}

export default FavoriteItemList;
