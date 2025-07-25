import ClubDetailPage from '@/views/club/ui/club-detail-page';

function Page({ params }: { params: { id: Promise<string> } }) {
  return <ClubDetailPage params={params} />;
}

export default Page;
