'use client';

import React from 'react';
import cn from '@/shared/lib/utils';
import useNumberPagination from '@/shared/hooks/useNumberPagination';

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
  const { pages, safePage, canGoPrev, canGoNext, moveToPage } =
    useNumberPagination({ page, totalPages, pageRange });

  return (
    <nav
      data-from="NumberPagination"
      className="flex items-center justify-center gap-6 py-5 sm:py-8"
      aria-label="페이지네이션"
    >
      <button
        type="button"
        onClick={() => canGoPrev && moveToPage(safePage - 1)}
        disabled={!canGoPrev}
        aria-label="이전 페이지"
        className={cn(
          'cursor-pointer text-3xl',
          !canGoPrev && 'cursor-not-allowed opacity-30',
        )}
      >
        <img src="/pagination/prev.svg" alt="이전페이지" />
      </button>

      <div className="flex items-center gap-4 text-3xl">
        {pages.map((pageItem) => {
          if (pageItem === 'ellipsis-start' || pageItem === 'ellipsis-end') {
            return (
              <span key={pageItem} className="text-base text-[#BDBDBD]">
                <img src="/pagination/ellipses.svg" alt="말줄임" />
              </span>
            );
          }

          const isActive = pageItem === safePage;

          return (
            <button
              key={pageItem}
              type="button"
              onClick={() => moveToPage(pageItem)}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'cursor-pointer text-base transition-colors sm:text-lg',
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
        onClick={() => canGoNext && moveToPage(safePage + 1)}
        disabled={!canGoNext}
        aria-label="다음 페이지"
        className={cn(
          'cursor-pointer text-3xl',
          !canGoNext && 'cursor-not-allowed opacity-30',
        )}
      >
        <img src="/pagination/next.svg" alt="다음페이지" />
      </button>
    </nav>
  );
}
