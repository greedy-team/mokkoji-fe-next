import RecruitHeader from '@/entities/recruit/ui/recruit-header';
import RecruitItemList from '@/widgets/recruit/ui/recruit-item-list';
import { RecruitItemListProps } from '@/widgets/recruit/model/type';

function RecruitPage({ searchParams }: RecruitItemListProps) {
  return (
    <div>
      <RecruitHeader />
      <RecruitItemList searchParams={searchParams} />
    </div>
  );
}

export default RecruitPage;
