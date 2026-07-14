import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import AdminDashboardView from '@/views/admin/ui/AdminDashboardView';
import getAdminInfo from '@/features/admin/api/getAdminInfo';
import getDashboardData from '@/features/admin/api/getDashboardData';

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

  const { universityCode: selectedFromUrl } = await searchParams;
  const {
    universities,
    universityCode,
    clubMasterApplications,
    clubApplications,
  } = await getDashboardData(adminInfo, selectedFromUrl);

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
