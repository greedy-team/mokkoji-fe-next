import ClubHeader from '@/entities/club/ui/club-header';
import ClubItemList from '@/widgets/club/ui/club-item-list';
import { RecruitItemListProps } from '@/widgets/recruit/model/type';
import ScrollTopButton from '@/features/recruit/ui/scroll-top-button';
import { Suspense } from 'react';
import SharedLoading from '@/shared/ui/loading';

function ClubPage({ searchParams }: RecruitItemListProps) {
  return (
    <>
      <div className="mx-auto sm:w-4xl lg:w-6xl">
        <Suspense fallback={<SharedLoading />}>
          <ClubHeader />
          <ClubItemList searchParams={searchParams} />
        </Suspense>
      </div>
      <ScrollTopButton />
    </>
  );
}

export default ClubPage;
