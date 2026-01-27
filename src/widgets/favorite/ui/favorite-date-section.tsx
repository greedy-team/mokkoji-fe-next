'use client';

import SharedLoading from '@/shared/ui/loading';
import dynamic from 'next/dynamic';
import ClientErrorBoundaryUi from '@/shared/ui/client-error-boundary-ui';

const FavoriteDynamicSection = dynamic(
  () => import('./favorite-dynamic-section'),
  { ssr: false, loading: () => <SharedLoading /> },
);

function FavoriteDateSection() {
  return (
    <>
      <h1 className="mt-18 mb-7 text-2xl font-bold">모집 일정</h1>
      <ClientErrorBoundaryUi>
        <FavoriteDynamicSection />
      </ClientErrorBoundaryUi>
    </>
  );
}

export default FavoriteDateSection;
