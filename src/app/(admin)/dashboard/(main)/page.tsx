import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import AdminMainView from '@/views/admin/ui/AdminMainView';
import AdminDashboardView from '@/views/admin/ui/AdminDashboardView';
import getAdminInfo from '@/features/admin/api/getAdminInfo';
import getClubMasterApplications from '@/features/admin/api/getClubMasterApplications';
import getClubApplications from '@/features/admin/api/getClubApplications';
import getAdminClubs from '@/features/admin/api/getAdminClubs';
import getUniversities from '@/entities/university/api/getUniversities';

export const dynamic = 'force-dynamic';

interface DashboardPageProps {
  searchParams: Promise<{ universityCode?: string }>;
}

async function DashboardPage({ searchParams }: DashboardPageProps) {
  const adminInfoResult = await getAdminInfo();

  if (!adminInfoResult.ok || !adminInfoResult.data) {
    if (adminInfoResult.status >= 500) {
      throw new Error(adminInfoResult.message);
    }
    redirect('/dashboard/login');
  }

  const adminInfo = adminInfoResult.data;
  const isMokkojiAdmin = adminInfo.role === 'MOKKOJI_ADMIN';

  const universitiesResult = await getUniversities();
  const universities =
    universitiesResult?.ok && universitiesResult.data
      ? universitiesResult.data.universities.map((university) => ({
          code: university.code,
          name: university.name,
        }))
      : [];

  const { universityCode: selectedFromUrl } = await searchParams;
  const universityCode = isMokkojiAdmin
    ? (selectedFromUrl ?? universities[0]?.code)
    : (adminInfo.universityCode ?? undefined);

  const [clubMasterData, clubApplicationData, clubsData] = await Promise.all([
    getClubMasterApplications({ page: 1, size: 100, universityCode }),
    getClubApplications({
      status: 'PENDING',
      page: 1,
      size: 100,
      universityCode,
    }),
    getAdminClubs({ page: 1, size: 100, universityCode }),
  ]);

  const clubMasterApplications = clubMasterData?.applications ?? [];
  const clubApplications = clubApplicationData?.applications ?? [];
  const clubs = clubsData?.clubs ?? [];

  const totalClubs = clubsData?.pagination?.totalElements ?? 0;
  const pendingMasterCount = clubMasterData?.pagination?.totalElements ?? 0;
  const pendingClubCount = clubApplicationData?.page?.totalElements ?? 0;
  const totalMasters = clubs.filter((club) => club.clubMaster !== null).length;

  return (
    <Suspense>
      <AdminMainView
        dashboardContent={
          <AdminDashboardView
            clubMasterApplications={clubMasterApplications}
            clubApplications={clubApplications}
            totalClubs={totalClubs}
            pendingMasterCount={pendingMasterCount}
            pendingClubCount={pendingClubCount}
            totalMasters={totalMasters}
            role={adminInfo.role}
            universities={universities}
            selectedCode={universityCode ?? ''}
          />
        }
      />
    </Suspense>
  );
}

export default DashboardPage;
