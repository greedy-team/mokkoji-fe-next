import ClubDetailPage from '@/views/club/ui/club-detail-page';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import ClubDetailSkeleton from '@/entities/club/ui/club-detail-skeleton';
import { type Metadata } from 'next';
import getClubDetail from '@/views/club/api/getClubDetail';
import getRecentRecruitDetail from '@/views/club/api/getRecentRecruitDetail';
import { getUniversityName } from '@/shared/lib/universityMeta';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';

interface PageProps {
  params: Promise<{ universityCode: string; id: string }>;
  searchParams: Promise<{ tab?: string; recruit?: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { universityCode, id } = await params;
  const result = await getClubDetail(Number(id));
  const universityName = getUniversityName(universityCode);

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
  const { id, universityCode } = await params;
  const { tab = 'recruit', recruit } = await searchParams;

  let recent;
  try {
    recent = await getRecentRecruitDetail(Number(id));
  } catch {
    return <ErrorBoundaryUi />;
  }

  if (recent.status === 404 || !recent.data) notFound();
  if (!recent.ok) return <ErrorBoundaryUi />;

  return (
    <Suspense fallback={<ClubDetailSkeleton />}>
      <ClubDetailPage
        id={Number(id)}
        universityCode={universityCode}
        tab={tab}
        recruit={recruit}
        recent={recent.data}
      />
    </Suspense>
  );
}

export default Page;
