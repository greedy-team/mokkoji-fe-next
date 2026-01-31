'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import cn from '@/shared/lib/utils';

type PaginationPage = number | 'ellipsis';

function getPaginationPages(
  currentPage: number,
  totalPages: number,
  pageRange = 5,
): PaginationPage[] {
  const pages: PaginationPage[] = [];
  if (totalPages <= pageRange) {
    for (let page = 1; page <= totalPages; page += 1) pages.push(page);
    return pages;
  }

  const halfRange = Math.floor(pageRange / 2);
  let startPage = currentPage - halfRange;
  let endPage = currentPage + halfRange;

  if (startPage < 1) {
    startPage = 1;
    endPage = pageRange;
  }
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = totalPages - pageRange + 1;
  }

  if (startPage > 1) pages.push(1);
  if (startPage > 2) pages.push('ellipsis');

  for (let page = startPage; page <= endPage; page += 1) pages.push(page);

  if (endPage < totalPages - 1) pages.push('ellipsis');
  if (endPage < totalPages) pages.push(totalPages);

  return pages;
}

type Props = {
  page: number;
  totalPages: number;
  pageRange?: number;
};

export default function NumberPagination({
  page,
  totalPages,
  pageRange = 5,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const pages = getPaginationPages(page, totalPages, pageRange);

  const moveToPage = (nextPage: number) => {
    const params = new URLSearchParams(searchParams);

    params.delete('page');
    params.set('page', String(nextPage));
    router.push(`?${params.toString()}`, { scroll: true });
  };

  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  let ellipsisIndex = 0;

  return (
    <nav
      data-from="NumberPagination"
      className="flex items-center justify-center gap-6 py-5 sm:py-8"
      aria-label="페이지네이션"
    >
      <button
        type="button"
        onClick={() => canGoPrev && moveToPage(page - 1)}
        disabled={!canGoPrev}
        aria-label="이전 페이지"
        className={cn(
          'text-3xl',
          !canGoPrev && 'cursor-not-allowed opacity-30',
        )}
      >
        <img src="/pagination/prev.svg" alt="이전페이지" />
      </button>

      <div className="flex items-center gap-4 text-3xl">
        {pages.map((pageItem) => {
          if (pageItem === 'ellipsis') {
            ellipsisIndex += 1;
            return (
              <span
                key={`ellipsis-${ellipsisIndex}`}
                className="text-base text-[#BDBDBD]"
              >
                <img src="/pagination/ellipses.svg" alt="말줄임" />
              </span>
            );
          }

          const isActive = pageItem === page;

          return (
            <button
              key={pageItem}
              type="button"
              onClick={() => moveToPage(pageItem)}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'text-base transition-colors sm:text-lg',
                isActive ? 'text-black' : 'text-[#BDBDBD] hover:text-black',
              )}
            >
              {pageItem}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => canGoNext && moveToPage(page + 1)}
        disabled={!canGoNext}
        aria-label="다음 페이지"
        className={cn(
          'text-3xl',
          !canGoNext && 'cursor-not-allowed opacity-30',
        )}
      >
        <img src="/pagination/next.svg" alt="다음페이지" />
      </button>
    </nav>
  );
}
