import RecruitPage from '@/views/recruit/recruit-page';
import { RecruitItemListProps } from '@/widgets/recruit/model/type';

function Page({ searchParams }: RecruitItemListProps) {
  return <RecruitPage searchParams={searchParams} />;
}

export default Page;
