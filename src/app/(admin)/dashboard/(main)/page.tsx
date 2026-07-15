import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import AdminMainView from '@/views/admin/ui/AdminMainView';
import AdminDashboardView from '@/views/admin/ui/AdminDashboardView';
import getAdminInfo from '@/features/admin/api/getAdminInfo';
import getDashboardSummary from '@/features/admin/lib/getDashboardSummary';
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

  const summaryResult = await getDashboardSummary(universityCode);

  if (!summaryResult.ok || !summaryResult.data) {
    throw new Error(summaryResult.message);
  }

  return (
    <Suspense>
      <AdminMainView
        dashboardContent={
          <AdminDashboardView
            summary={summaryResult.data}
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
