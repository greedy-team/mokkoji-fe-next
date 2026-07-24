import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type PaginationPage = number | 'ellipsis-start' | 'ellipsis-end';

function getPaginationPages(
  currentPage: number,
  totalPages: number,
  pageRange: number,
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
  if (startPage > 2) pages.push('ellipsis-start');

  for (let page = startPage; page <= endPage; page += 1) pages.push(page);

  if (endPage < totalPages - 1) pages.push('ellipsis-end');
  if (endPage < totalPages) pages.push(totalPages);

  return pages;
}

interface Params {
  page: number;
  totalPages: number;
  pageRange?: number;
  prefetchNext?: boolean;
}

function useNumberPagination({
  page,
  totalPages,
  pageRange = 5,
  prefetchNext = true,
}: Params) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const safeTotalPages = Math.max(1, totalPages);
  const safePage = Math.min(Math.max(1, page), safeTotalPages);
  const pages = getPaginationPages(safePage, safeTotalPages, pageRange);

  const canGoPrev = safePage > 1;
  const canGoNext = safePage < safeTotalPages;

  const buildPageUrl = (nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete('page');
    params.set('page', String(nextPage));
    return `?${params.toString()}`;
  };

  const moveToPage = (nextPage: number) => {
    router.push(buildPageUrl(nextPage), { scroll: true });
  };

  useEffect(() => {
    if (prefetchNext && canGoNext) {
      router.prefetch(buildPageUrl(safePage + 1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safePage, canGoNext, prefetchNext]);

  return { pages, safePage, canGoPrev, canGoNext, moveToPage };
}

export default useNumberPagination;
export type { PaginationPage };
