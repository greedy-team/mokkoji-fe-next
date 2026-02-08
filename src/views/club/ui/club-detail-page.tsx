import { notFound, redirect } from 'next/navigation';
import RecruitDetailHeader from '@/entities/club-detail/ui/recruit-detail-header';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import { auth } from '@/auth';
import ClubDetailTabs from '@/entities/club-detail/ui/club-detail-tabs';
import getRecentRecruitDetail from '@/views/club/api/getRecentRecruitDetail';
import getClubRecruitments from '../api/getClubRecruitments';
import getRecruitDetail from '../api/getRecruitDetail';

interface ClubDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string; rid?: string }>;
}

async function ClubDetailPage({ params, searchParams }: ClubDetailPageProps) {
  const { id } = await params;
  const { tab = 'recruit', rid } = await searchParams;

  const [recent, recruitHistories] = await Promise.all([
    getRecentRecruitDetail(Number(id)),
    getClubRecruitments(Number(id)),
  ]);

  if (recent?.status === 404 || !recent.data) notFound();
  if (!recent.ok) return <ErrorBoundaryUi />;

  const historiesArray = recruitHistories.ok
    ? (recruitHistories.data?.recruitments ?? [])
    : [];

  if (!(await searchParams).rid) {
    const queryString = new URLSearchParams();
    queryString.set('rid', String(recent.data.id));
    if (tab !== 'recruit') queryString.set('tab', tab);
    redirect(`/club/${id}?${queryString.toString()}`);
  }

  const recruitmentId = Number(rid) || recent.data.id;
  //   if (!rid) notFound();

  const selected = await getRecruitDetail(recruitmentId);
  //   if (selected?.status === 404 || !selected.data) notFound();
  //   if (!selected.ok) return <ErrorBoundaryUi />;

  return (
    <div className="mt-5 px-5 lg:mt-[50px] lg:w-[60%] lg:max-w-[60%] lg:min-w-[60%]">
      <RecruitDetailHeader
        title={recent.data.clubName}
        category={recent.data.category}
        startDate={recent.data.recruitStart}
        endDate={recent.data.recruitEnd}
        instagram={recent.data.instagramUrl}
        clubId={Number(id)}
        isFavorite={recent.data.isFavorite}
        createdAt={recent.data.createdAt}
        logo={recent.data.logo}
        status={recent.data.status}
        isAlwaysRecruiting={recent.data.isAlwaysRecruiting}
      />

      <ClubDetailTabs
        activeTab={tab}
        recruitData={selected.data}
        recruitHistories={historiesArray}
        id={Number(id)}
        rid={recruitmentId}
      />
    </div>
  );
}

export default ClubDetailPage;
