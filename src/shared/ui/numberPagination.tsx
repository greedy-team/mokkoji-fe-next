'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import cn from '@/shared/lib/utils';

type Item = number | 'ellipsis';

function getPaginationItems(
  current: number,
  total: number,
  windowSize = 5,
): Item[] {
  const items: Item[] = [];
  if (total <= windowSize) {
    for (let i = 1; i <= total; i += 1) items.push(i);
    return items;
  }

  const half = Math.floor(windowSize / 2);
  let start = current - half;
  let end = current + half;

  if (start < 1) {
    start = 1;
    end = windowSize;
  }
  if (end > total) {
    end = total;
    start = total - windowSize + 1;
  }

  if (start > 1) items.push(1);
  if (start > 2) items.push('ellipsis');

  for (let p = start; p <= end; p += 1) items.push(p);

  if (end < total - 1) items.push('ellipsis');
  if (end < total) items.push(total);

  return items;
}

type Props = {
  page: number;
  totalPages: number;
  windowSize?: number;
};

export default function NumberPagination({
  page,
  totalPages,
  windowSize = 5,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const items = getPaginationItems(page, totalPages, windowSize);

  const go = (nextPage: number) => {
    const params = new URLSearchParams(searchParams);

    params.delete('page');
    params.set('page', String(nextPage));
    router.push(`?${params.toString()}`, { scroll: true });
  };

  const canPrev = page > 1;
  const canNext = page < totalPages;

  let ellipsisCount = 0;

  return (
    <nav
      data-from="NumberPagination"
      className="flex items-center justify-center gap-6 py-5 sm:py-8"
      aria-label="페이지네이션"
    >
      <button
        type="button"
        onClick={() => canPrev && go(page - 1)}
        disabled={!canPrev}
        aria-label="이전 페이지"
        className={cn('text-3xl', !canPrev && 'cursor-not-allowed opacity-30')}
      >
        <img src="/pagination/prev.svg" alt="이전페이지" />
      </button>

      <div className="flex items-center gap-4 text-3xl">
        {items.map((item) => {
          if (item === 'ellipsis') {
            ellipsisCount += 1;
            return (
              <span
                key={`ellipsis-${ellipsisCount}`}
                className="text-base text-[#BDBDBD]"
              >
                <img src="/pagination/ellipses.svg" />
              </span>
            );
          }

          const isActive = item === page;

          return (
            <button
              key={item}
              type="button"
              onClick={() => go(item)}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'transition-colors, text-base sm:text-lg',
                isActive ? 'text-black' : 'text-[#BDBDBD] hover:text-black',
              )}
            >
              {item}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => canNext && go(page + 1)}
        disabled={!canNext}
        aria-label="다음 페이지"
        className={cn('text-3xl', !canNext && 'cursor-not-allowed opacity-30')}
      >
        <img src="/pagination/next.svg" alt="다음페이지" />
      </button>
    </nav>
  );
}
