import RecruitHeader from '@/entities/recruit/ui/recruit-header';
import RecruitItemList from '@/widgets/recruit/ui/recruit-item-list';
import { RecruitItemListProps } from '@/widgets/recruit/model/type';
import ScrollTopButton from '@/features/recruit/ui/scroll-top-button';
import { Suspense } from 'react';
import ItemListSkeletonLoading from '@/shared/ui/item-list-skeleton-loading';

function RecruitPage({ searchParams }: RecruitItemListProps) {
  return (
    <>
      <div className="mx-auto sm:w-4xl lg:w-6xl">
        <RecruitHeader />
        <Suspense fallback={<ItemListSkeletonLoading />}>
          <RecruitItemList searchParams={searchParams} />
        </Suspense>
      </div>
      <ScrollTopButton />
    </>
  );
}
export default RecruitPage;
