import RecruitPage from '@/views/recruit/ui/recruit-page';

function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; size?: string; category?: string }>;
}) {
  return <RecruitPage searchParams={searchParams} />;
}

export default Page;
