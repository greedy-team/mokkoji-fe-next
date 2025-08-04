import RecruitHeader from '@/entities/recruit/ui/recruit-header';
import RecruitItemList from '@/widgets/recruit/ui/recruit-item-list';
import { RecruitItemListProps } from '@/widgets/recruit/model/type';
import ScrollToTopButton from '@/features/recruit/ui/scroll-to-top-button';

function RecruitPage({ searchParams }: RecruitItemListProps) {
  return (
    <>
      <RecruitHeader />
      <RecruitItemList searchParams={searchParams} />
      <ScrollToTopButton />
    </>
  );
}
export default RecruitPage;
