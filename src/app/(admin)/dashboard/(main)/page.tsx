import { redirect } from 'next/navigation';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import AdminMainView from '@/views/admin/ui/AdminMainView';
import AdminDashboardView from '@/views/admin/ui/AdminDashboardView';
import getAdminInfo from '@/features/admin/api/getAdminInfo';
import getDashboardData from '@/features/admin/api/getDashboardData';
import getServerQueryClient from '@/shared/lib/get-query-client';
import adminQueries, {
  ADMIN_CLUBS_PAGE_SIZE,
} from '@/entities/admin/api/queries';
import getServerManagementClubs from '@/entities/admin/api/getServerManagementClubs';

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

  const adminClubsPrefetch = adminUniversityCode
    ? queryClient.prefetchInfiniteQuery({
        ...adminQueries.clubs(adminUniversityCode),
        queryFn: ({ pageParam }) =>
          getServerManagementClubs({
            page: pageParam as number,
            size: ADMIN_CLUBS_PAGE_SIZE,
            universityCode: adminUniversityCode,
          }),
      })
    : null;

  const [
    { universities, universityCode, clubMasterApplications, clubApplications },
  ] = await Promise.all([
    getDashboardData(adminInfo, selectedFromUrl),
    adminClubsPrefetch,
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
