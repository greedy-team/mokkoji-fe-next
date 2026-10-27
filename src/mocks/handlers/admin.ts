/* eslint-disable import/no-extraneous-dependencies, import/prefer-default-export */
import { http, HttpResponse } from 'msw';
import { getUniversityName } from '@/shared/lib/universityMeta';
import type { AdminClubsData } from '@/entities/admin/api/getManagementClubs';
import type {
  AdminInfo,
  ApplicationStatus,
  ClubApplication,
  ClubMasterApplication,
  PaginationMeta,
} from '@/features/admin/model/dashboard-types';
import {
  adminClubs,
  clubApplications,
  clubMasterApplications,
  mockAdminInfo,
} from '../data';
import {
  apiUrl,
  errorResponse,
  pageParams,
  paginate,
  type MockResponse,
} from '../response';

interface RejectBody {
  rejectReason?: string;
}

const filterApplications = <
  T extends { status: ApplicationStatus; universityName: string },
>(
  applications: T[],
  params: URLSearchParams,
) => {
  const status = params.get('status');
  const universityCode = params.get('universityCode');
  return applications.filter(
    (application) =>
      (!status || application.status === status) &&
      (!universityCode ||
        application.universityName === getUniversityName(universityCode)),
  );
};

const reviewHandlers = <
  T extends { status: ApplicationStatus; rejectReason: string | null },
>(
  path: string,
  findApplication: (applicationId: number) => T | undefined,
  notFoundMessage: string,
) => [
  http.patch<{ applicationId: string }>(
    apiUrl(`${path}/:applicationId/approve`),
    ({ params }) => {
      const application = findApplication(Number(params.applicationId));
      if (!application) return errorResponse(404, notFoundMessage);
      application.status = 'APPROVED';
      application.rejectReason = null;
      return new HttpResponse(null, { status: 200 });
    },
  ),
  http.patch<{ applicationId: string }, RejectBody>(
    apiUrl(`${path}/:applicationId/reject`),
    async ({ params, request }) => {
      const application = findApplication(Number(params.applicationId));
      if (!application) return errorResponse(404, notFoundMessage);
      const body = await request.json();
      application.status = 'REJECTED';
      application.rejectReason = body.rejectReason ?? null;
      return new HttpResponse(null, { status: 200 });
    },
  ),
];

export const adminHandlers = [
  http.get<never, never, MockResponse<AdminInfo>>(apiUrl('/admin/me'), () =>
    HttpResponse.json({ data: mockAdminInfo }),
  ),

  http.get<
    never,
    never,
    MockResponse<{
      applications: ClubMasterApplication[];
      pagination: PaginationMeta;
    }>
  >(apiUrl('/admin/club-master-applications'), ({ request }) => {
    const { params, page, size } = pageParams(request);
    const { items, pagination } = paginate(
      filterApplications(clubMasterApplications, params),
      page,
      size,
    );
    return HttpResponse.json({ data: { applications: items, pagination } });
  }),

  ...reviewHandlers(
    '/admin/club-master-applications',
    (applicationId) =>
      clubMasterApplications.find(({ id }) => id === applicationId),
    '동아리장 권한 신청을 찾을 수 없습니다.',
  ),

  http.get<
    never,
    never,
    MockResponse<{ applications: ClubApplication[]; page: PaginationMeta }>
  >(apiUrl('/admin/club-applications'), ({ request }) => {
    const { params, page, size } = pageParams(request);
    const { items, pagination } = paginate(
      filterApplications(clubApplications, params),
      page,
      size,
    );
    return HttpResponse.json({
      data: { applications: items, page: pagination },
    });
  }),

  ...reviewHandlers(
    '/admin/club-applications',
    (applicationId) =>
      clubApplications.find(
        (application) => application.applicationId === applicationId,
      ),
    '동아리 생성 신청을 찾을 수 없습니다.',
  ),

  http.get<never, never, MockResponse<AdminClubsData>>(
    apiUrl('/admin/clubs'),
    ({ request }) => {
      const { params, page, size } = pageParams(request);
      const universityCode = params.get('universityCode');
      const { items, pagination } = paginate(
        universityCode
          ? adminClubs.filter((club) => club.universityCode === universityCode)
          : adminClubs,
        page,
        size,
      );
      return HttpResponse.json({ data: { clubs: items, page: pagination } });
    },
  ),

  http.delete<{ clubId: string }>(
    apiUrl('/admin/clubs/:clubId'),
    ({ params }) => {
      const index = adminClubs.findIndex(
        (club) => club.clubId === Number(params.clubId),
      );
      if (index < 0) return errorResponse(404, '동아리를 찾을 수 없습니다.');
      adminClubs.splice(index, 1);
      return new HttpResponse(null, { status: 204 });
    },
  ),
];
