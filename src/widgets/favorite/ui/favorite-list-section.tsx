'use client';

import dynamic from 'next/dynamic';
import { AsyncBoundaryWithQuery } from '@/shared/ui/AsyncBoundary';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import FavoriteListSkeletonLoading from '@/entities/favorite/ui/favorite-list-skeleton-loading';

// 즐겨찾기는 브라우저가 쿠키로 백엔드를 직접 부르므로 서버 렌더링에서는 그리지 않는다.
// 서버에서 그리면 useSuspenseQuery 가 서버에서 client-api 를 불러 실패한다
const FavoriteItemSection = dynamic(() => import('./favorite-item-section'), {
  ssr: false,
  loading: () => <FavoriteListSkeletonLoading />,
});

function FavoriteListSection() {
  return (
    <AsyncBoundaryWithQuery
      pendingFallback={<FavoriteListSkeletonLoading />}
      rejectedFallback={<ErrorBoundaryUi />}
    >
      <FavoriteItemSection />
    </AsyncBoundaryWithQuery>
  );
}

export default FavoriteListSection;
