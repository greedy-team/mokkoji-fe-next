import RecruitHeader from '@/entities/recruit/ui/recruit-header';
import RecruitItemList from '@/widgets/recruit/ui/recruit-item-list';
import { RecruitItemListProps } from '@/widgets/recruit/model/type';
import ScrollTopButton from '@/features/recruit/ui/scroll-top-button';
import { Suspense } from 'react';
import SharedLoading from '@/shared/ui/loading';

function RecruitPage({ searchParams }: RecruitItemListProps) {
  return (
    <>
      <Suspense fallback={<SharedLoading />}>
        <RecruitHeader />
        <RecruitItemList searchParams={searchParams} />
      </Suspense>
      <ScrollTopButton />
    </>
  );
}
export default RecruitPage;
