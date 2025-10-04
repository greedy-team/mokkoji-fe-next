import ClubPage from '@/views/club/ui/club-page';
import { RecruitItemListProps } from '@/widgets/recruit/model/type';

export const revalidate = 1800;

function Page({ searchParams }: RecruitItemListProps) {
  return <ClubPage searchParams={searchParams} />;
}

export default Page;
