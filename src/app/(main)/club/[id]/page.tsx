import RecruitDetailPage from '@/views/club/ui/recruit-detail-page';

function Page({ params }: { params: { id: Promise<string> } }) {
  return <RecruitDetailPage params={params} />;
}

export default Page;
