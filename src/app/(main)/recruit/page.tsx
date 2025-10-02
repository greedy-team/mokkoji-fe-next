import RecruitPage from '@/views/recruit/ui/recruit-page';

function Page({ searchParams }: { searchParams: RecruitItemListProps }) {
  return <RecruitPage searchParams={searchParams} />;
}

export default Page;
