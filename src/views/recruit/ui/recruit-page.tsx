import RecruitHeader from '@/entities/recruit/ui/recruit-header';
import RecruitItemList from '@/widgets/recruit/ui/recruit-item-list';
import { RecruitItemListProps } from '@/widgets/recruit/model/type';
import ScrollTopButton from '@/features/recruit/ui/scroll-top-button';

function RecruitPage({ searchParams }: RecruitItemListProps) {
  return (
    <>
      <RecruitHeader />
      <RecruitItemList searchParams={searchParams} />
      <ScrollTopButton />
    </>
  );
}
export default RecruitPage;
