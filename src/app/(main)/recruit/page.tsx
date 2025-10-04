import RecruitPage from '@/views/recruit/ui/recruit-page';
import { RecruitmentSearchParams } from '@/shared/model/recruit-type';

export const revalidate = 1800;

function Page({
  searchParams,
}: {
  searchParams: Promise<RecruitmentSearchParams>;
}) {
  return <RecruitPage searchParams={searchParams} />;
}

export default Page;
