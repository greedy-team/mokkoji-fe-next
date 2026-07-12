import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import AdminDashboardView from '@/views/admin/ui/AdminDashboardView';
import getAdminInfo from '@/features/admin/api/getAdminInfo';
import getClubMasterApplications from '@/features/admin/api/getClubMasterApplications';
import getClubApplications from '@/features/admin/api/getClubApplications';
import getUniversities from '@/entities/university/api/getUniversities';
import type { ApplicationStatus } from '@/features/admin/model/dashboard-types';

interface DashboardPageProps {
  searchParams: Promise<{ universityCode?: string }>;
}

const APPLICATION_STATUSES: ApplicationStatus[] = [
  'PENDING',
  'APPROVED',
  'REJECTED',
];

async function DashboardPage({ searchParams }: DashboardPageProps) {
  const adminInfo = await getAdminInfo();

  if (!adminInfo) {
    redirect('/dashboard/login');
  }

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

  const [clubMasterData, ...clubApplicationResults] = await Promise.all([
    getClubMasterApplications({ page: 1, size: 100, universityCode }),
    ...APPLICATION_STATUSES.map((status) =>
      getClubApplications({ status, page: 1, size: 100, universityCode }),
    ),
  ]);

  const clubMasterApplications = clubMasterData?.applications ?? [];
  const clubApplications = clubApplicationResults.flatMap(
    (result) => result?.applications ?? [],
  );

  return (
    <Suspense>
      <AdminDashboardView
        clubMasterApplications={clubMasterApplications}
        clubApplications={clubApplications}
        role={adminInfo.role}
        universities={universities}
        selectedCode={universityCode ?? ''}
      />
    </Suspense>
  );
}

export default DashboardPage;
