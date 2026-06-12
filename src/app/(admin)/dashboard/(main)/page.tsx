import { Suspense } from 'react';
import AdminDashboardView from '@/views/admin/ui/AdminDashboardView';
import getClubMasterApplications from '@/features/admin/api/getClubMasterApplications';
import getClubApplications from '@/features/admin/api/getClubApplications';
import getAdminClubs from '@/features/admin/api/getAdminClubs';

async function DashboardPage() {
  const [clubMasterData, clubApplicationData, clubsData] = await Promise.all([
    getClubMasterApplications({ page: 1, size: 100 }),
    getClubApplications({ status: 'PENDING', page: 1, size: 100 }),
    getAdminClubs({ page: 1, size: 100 }),
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
      <AdminDashboardView
        clubMasterApplications={clubMasterApplications}
        clubApplications={clubApplications}
        totalClubs={totalClubs}
        pendingMasterCount={pendingMasterCount}
        pendingClubCount={pendingClubCount}
        totalMasters={totalMasters}
      />
    </Suspense>
  );
}

export default DashboardPage;
