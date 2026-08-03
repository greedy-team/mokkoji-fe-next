import { redirect } from 'next/navigation';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import AdminMainView from '@/views/admin/ui/AdminMainView';
import AdminDashboardView from '@/views/admin/ui/AdminDashboardView';
import getAdminInfo from '@/features/admin/api/getAdminInfo';
import getDashboardData from '@/features/admin/api/getDashboardData';
import getServerQueryClient from '@/shared/lib/get-query-client';
import prefetchAdminClubs from '@/entities/admin/api/prefetchAdminClubs';

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
    redirect('/api/auth/dashboard-logout');
  }

  const adminInfo = adminInfoResult.data;
  const adminUniversityCode = adminInfo.universityCode;

  const { universityCode: selectedFromUrl } = await searchParams;
  const queryClient = getServerQueryClient();

  const [
    { universities, universityCode, clubMasterApplications, clubApplications },
  ] = await Promise.all([
    getDashboardData(adminInfo, selectedFromUrl),
    prefetchAdminClubs(queryClient, adminUniversityCode),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminMainView
        adminUniversityCode={adminUniversityCode ?? undefined}
        dashboardContent={
          <AdminDashboardView
            clubMasterApplications={clubMasterApplications}
            clubApplications={clubApplications}
            role={adminInfo.role}
            universities={universities}
            selectedCode={universityCode ?? ''}
          />
        }
      />
    </HydrationBoundary>
  );
}

export default DashboardPage;
