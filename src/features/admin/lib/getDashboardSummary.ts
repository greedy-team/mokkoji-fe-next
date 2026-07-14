import 'server-only';
import getAdminClubs from '@/features/admin/api/getAdminClubs';
import getClubApplications from '@/features/admin/api/getClubApplications';
import getClubMasterApplications from '@/features/admin/api/getClubMasterApplications';
import type { DashboardSummary } from '@/features/admin/model/dashboard-types';

const SUMMARY_PAGE = 1;
const SUMMARY_SIZE = 100;

async function getDashboardSummary(universityCode?: string) {
  const [clubMasterResult, clubApplicationResult, clubsResult] =
    await Promise.all([
      getClubMasterApplications({
        page: SUMMARY_PAGE,
        size: SUMMARY_SIZE,
        universityCode,
      }),
      getClubApplications({
        status: 'PENDING',
        page: SUMMARY_PAGE,
        size: SUMMARY_SIZE,
        universityCode,
      }),
      getAdminClubs({
        page: SUMMARY_PAGE,
        size: SUMMARY_SIZE,
        universityCode,
      }),
    ]);

  const failedResult = [
    clubMasterResult,
    clubApplicationResult,
    clubsResult,
  ].find((result) => !result.ok);

  if (failedResult) {
    return {
      ok: false,
      message: failedResult.message,
      data: undefined,
      status: failedResult.status,
    };
  }

  const clubs = clubsResult.data?.clubs ?? [];

  const summary: DashboardSummary = {
    clubMasterApplications: clubMasterResult.data?.applications ?? [],
    clubApplications: clubApplicationResult.data?.applications ?? [],
    totalClubs: clubsResult.data?.pagination?.totalElements ?? 0,
    pendingMasterCount: clubMasterResult.data?.pagination?.totalElements ?? 0,
    pendingClubCount: clubApplicationResult.data?.page?.totalElements ?? 0,
    totalMasters: clubs.filter((club) => club.clubMaster !== null).length,
  };

  return { ok: true, message: '성공', data: summary, status: 200 };
}

export default getDashboardSummary;
