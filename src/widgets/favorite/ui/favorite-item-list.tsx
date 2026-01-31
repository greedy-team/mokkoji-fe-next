'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import cn from '@/shared/lib/utils';
import FavoriteItem from '@/entities/favorite/ui/favorite-item';
import { Button } from '@/shared/ui/button';
import { ClubType, RecruitStatus } from '@/shared/model/type';

type FavoriteClub = ClubType & {
  isAlwaysRecruiting: boolean;
  recruitStatus: RecruitStatus;
};

interface FavoriteItemListProps {
  clubs: FavoriteClub[];
  totalElements: number;
}

const MOBILE_SIZE = 3;
const DESKTOP_SIZE = 6;

function FavoriteItemList({ clubs, totalElements }: FavoriteItemListProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const mobileTotalPages = Math.ceil(clubs.length / MOBILE_SIZE);
  const desktopTotalPages = Math.ceil(clubs.length / DESKTOP_SIZE);

  const mobileData = clubs.slice(
    currentPage * MOBILE_SIZE,
    (currentPage + 1) * MOBILE_SIZE,
  );

  const desktopData = clubs.slice(
    currentPage * DESKTOP_SIZE,
    (currentPage + 1) * DESKTOP_SIZE,
  );

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = (totalPages: number) => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

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
          'grid w-auto grid-cols-1 gap-3 lg:hidden',
          clubs.length === 0 && 'hidden',
        )}
      >
        {mobileData.map((item) => (
          <li key={`mobile-${item.id}`}>
            <Link href={`/club/${item.id}`}>
              <FavoriteItem
                title={item.name}
                description={item.description || ''}
                clubId={String(item.id)}
                isFavorite={item.isFavorite}
                logo={item.logo}
                recruitStartDate={item.recruitStartDate}
                recruitEndDate={item.recruitEndDate}
                status={item.recruitStatus}
                isAlwaysRecruiting={item.isAlwaysRecruiting}
              />
            </Link>
          </li>
        ))}
      </ul>

      {mobileTotalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-4 lg:hidden">
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
          <div className="flex gap-2">
            {Array.from({ length: mobileTotalPages }).map((_, idx) => (
              <button
                // eslint-disable-next-line react/no-array-index-key
                key={`mobile-page-${idx}`}
                type="button"
                onClick={() => setCurrentPage(idx)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  currentPage === idx ? 'bg-[#00E457]' : 'bg-gray-300'
                }`}
                aria-label={`페이지 ${idx + 1}`}
              />
            ))}
          </div>
          <Button
            type="button"
            onClick={() => handleNext(mobileTotalPages)}
            disabled={currentPage >= mobileTotalPages - 1}
            className={cn(
              'h-[40px] w-[40px] rounded-full border border-[#CFCFCF] bg-white',
              currentPage >= mobileTotalPages - 1 &&
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
      )}

      <ul
        className={cn(
          'hidden w-auto grid-cols-3 gap-4 lg:grid',
          clubs.length === 0 && 'lg:hidden',
        )}
      >
        {desktopData.map((item) => (
          <li key={`desktop-${item.id}`}>
            <Link href={`/club/${item.id}`}>
              <FavoriteItem
                title={item.name}
                description={item.description || ''}
                clubId={String(item.id)}
                isFavorite={item.isFavorite}
                logo={item.logo}
                recruitStartDate={item.recruitStartDate}
                recruitEndDate={item.recruitEndDate}
                status={item.recruitStatus}
                isAlwaysRecruiting={item.isAlwaysRecruiting}
              />
            </Link>
          </li>
        ))}
      </ul>

      {desktopTotalPages > 1 && (
        <div className="mt-8 hidden gap-2 lg:flex">
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
            onClick={() => handleNext(desktopTotalPages)}
            disabled={currentPage >= desktopTotalPages - 1}
            className={cn(
              'h-[40px] w-[40px] rounded-full border border-[#CFCFCF] bg-white',
              currentPage >= desktopTotalPages - 1 &&
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
      )}
    </>
  );
}

export default FavoriteItemList;
