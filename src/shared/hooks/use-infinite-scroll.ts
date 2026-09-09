import { useEffect, useRef } from 'react';

interface Params {
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

function useInfiniteScroll({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: Params) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return () => {};

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return sentinelRef;
}

export default useInfiniteScroll;
