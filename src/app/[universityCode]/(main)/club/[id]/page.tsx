import ClubDetailPage from '@/views/club/ui/club-detail-page';
import { Suspense } from 'react';
import ClubDetailSkeleton from '@/entities/club/ui/club-detail-skeleton';
import { type Metadata } from 'next';
import getClubDetail from '@/views/club/api/getClubDetail';
import { getUniversityName } from '@/shared/lib/universityMeta';
import { toApiCode } from '@/shared/lib/urlCodeConverter';

interface PageProps {
  params: Promise<{ universityCode: string; id: string }>;
  searchParams: Promise<{ tab: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { universityCode, id } = await params;
  const result = await getClubDetail(Number(id));
  const universityName = getUniversityName(universityCode);

  // 상위 club/layout.tsx의 canonical(목록 URL)이 상속되므로 여기서 덮지 않으면
  // 상세 페이지 전부가 색인에서 빠진다. 쿼리를 빼야 ?tab= 변형도 이 URL로 모인다.
  const canonical = `https://mokkoji.site/${universityCode}/club/${id}`;

  if (!result.ok || !result.data) {
    return {
      title: `모꼬지 | ${universityName} 동아리`,
      description: `${universityName} 동아리 통합 플랫폼`,
      alternates: { canonical },
    };
  }

  const club = result.data;
  const description =
    club.description ||
    `${universityName} ${club.name} 동아리 정보를 확인해보세요.`;

  return {
    title: `모꼬지 | ${club.name}`,
    description,
    alternates: { canonical },
    openGraph: {
      title: `모꼬지 | ${club.name}`,
      description,
      url: canonical,
      images: club.logo ? [club.logo] : ['/mokkojiBanner.png'],
    },
  };
}

async function Page({ params, searchParams }: PageProps) {
  const detailParams: Promise<{ id: string; universityCode: string }> = params;
  return (
    <Suspense fallback={<ClubDetailSkeleton />}>
      <ClubDetailPage params={detailParams} searchParams={searchParams} />
    </Suspense>
  );
}

export default Page;
