import ClubDetailPage from '@/views/club/ui/club-detail-page';
import { Suspense } from 'react';
import ClubDetailSkeleton from '@/entities/club/ui/club-detail-skeleton';
import { type Metadata } from 'next';
import getClubDetail from '@/views/club/api/getClubDetail';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const result = await getClubDetail(Number(id));

  if (!result.ok || !result.data) {
    return {
      title: '모꼬지 | 세종대 동아리',
      description: '세종대학교 동아리 통합 플랫폼',
    };
  }

  const club = result.data;
  const description =
    club.description || `세종대학교 ${club.name} 동아리 정보를 확인해보세요.`;

  return {
    title: `모꼬지 | ${club.name}`,
    description,
    openGraph: {
      title: `모꼬지 | ${club.name}`,
      description,
      url: `https://mokkoji.site/club/${id}`,
      images: club.logo ? [club.logo] : ['/mokkojiBanner.png'],
    },
  };
}

async function Page({ params, searchParams }: PageProps) {
  return (
    <Suspense fallback={<ClubDetailSkeleton />}>
      <ClubDetailPage params={params} searchParams={searchParams} />
    </Suspense>
  );
}

export default Page;
