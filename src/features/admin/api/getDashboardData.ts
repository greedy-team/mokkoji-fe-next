import 'server-only';
import getUniversities from '@/entities/university/api/getUniversities';
import getClubMasterApplications from '@/features/admin/api/getClubMasterApplications';
import getClubApplications from '@/features/admin/api/getClubApplications';
import type {
  AdminInfo,
  ApplicationStatus,
} from '@/features/admin/model/dashboard-types';

const APPLICATION_STATUSES: ApplicationStatus[] = [
  'PENDING',
  'APPROVED',
  'REJECTED',
];

async function getDashboardData(
  adminInfo: AdminInfo,
  selectedFromUrl?: string,
) {
  const isMokkojiAdmin = adminInfo.role === 'MOKKOJI_ADMIN';

  const universitiesResult = await getUniversities();
  const universities =
    universitiesResult?.ok && universitiesResult.data
      ? universitiesResult.data.universities.map((university) => ({
          code: university.code,
          name: university.name,
        }))
      : [];

  const universityCode = isMokkojiAdmin
    ? (selectedFromUrl ?? universities[0]?.code)
    : (adminInfo.universityCode ?? undefined);

  const [clubMasterData, ...clubApplicationResults] = await Promise.all([
    getClubMasterApplications({ page: 1, size: 100, universityCode }),
    ...APPLICATION_STATUSES.map((status) =>
      getClubApplications({ status, page: 1, size: 100, universityCode }),
    ),
  ]);

  return {
    universities,
    universityCode,
    clubMasterApplications: clubMasterData.data?.applications ?? [],
    clubApplications: clubApplicationResults.flatMap(
      (result) => result.data?.applications ?? [],
    ),
  };
}

export default getDashboardData;
