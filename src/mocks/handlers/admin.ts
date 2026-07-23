/* eslint-disable import/no-extraneous-dependencies, import/prefer-default-export */
import { http, HttpResponse } from 'msw';
import {
  adminClubs,
  clubApplications,
  clubMasterApplications,
  knownApplicationIds,
  type ApplicationStatus,
} from '../data';

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? '';

const url = (path: string) => `${baseUrl}${path}`;

const buildPage = (totalElements: number, page: number, size: number) => ({
  page,
  size,
  totalPages: Math.max(1, Math.ceil(totalElements / size)),
  totalElements,
});

const notFound = (code: number, message: string) =>
  HttpResponse.json({ code, message }, { status: 404 });

export const adminHandlers = [
  http.get(url('/admin/club-master-applications'), ({ request }) => {
    const params = new URL(request.url).searchParams;
    const status = params.get('status') as ApplicationStatus | null;
    const universityCode = params.get('universityCode');
    const page = Number(params.get('page') ?? 1);
    const size = Number(params.get('size') ?? 20);

    let filtered = status
      ? clubMasterApplications.filter((item) => item.status === status)
      : clubMasterApplications;

    if (universityCode) {
      filtered = filtered.filter((item) =>
        item.universityName.startsWith(universityCode),
      );
    }

    return HttpResponse.json({
      data: {
        applications: filtered,
        page: buildPage(filtered.length, page, size),
      },
    });
  }),

  http.post(
    url('/admin/club-master-applications/:applicationId/approve'),
    ({ params }) => {
      const applicationId = Number(params.applicationId);
      if (!knownApplicationIds.has(applicationId)) {
        return notFound(40408, '동아리장 권한 신청을 찾을 수 없습니다.');
      }
      return new HttpResponse(null, { status: 200 });
    },
  ),

  http.post(
    url('/admin/club-master-applications/:applicationId/reject'),
    ({ params }) => {
      const applicationId = Number(params.applicationId);
      if (!knownApplicationIds.has(applicationId)) {
        return notFound(40408, '동아리장 권한 신청을 찾을 수 없습니다.');
      }
      return new HttpResponse(null, { status: 200 });
    },
  ),

  http.get(url('/admin/clubs'), ({ request }) => {
    const params = new URL(request.url).searchParams;
    const universityCode = params.get('universityCode');
    const page = Number(params.get('page') ?? 1);
    const size = Number(params.get('size') ?? 20);

    const filtered = universityCode
      ? adminClubs.filter((item) =>
          item.universityName.startsWith(universityCode),
        )
      : adminClubs;

    return HttpResponse.json({
      data: {
        clubs: filtered,
        pagination: buildPage(filtered.length, page, size),
      },
    });
  }),

  http.get(url('/admin/club-applications'), ({ request }) => {
    const params = new URL(request.url).searchParams;
    const status = params.get('status') as ApplicationStatus | null;
    const universityCode = params.get('universityCode');
    const page = Number(params.get('page') ?? 1);
    const size = Number(params.get('size') ?? 20);

    let filtered = status
      ? clubApplications.filter((item) => item.status === status)
      : clubApplications;

    if (universityCode) {
      filtered = filtered.filter((item) =>
        item.universityName.startsWith(universityCode),
      );
    }

    return HttpResponse.json({
      data: {
        applications: filtered,
        page: buildPage(filtered.length, page, size),
      },
    });
  }),

  http.post(
    url('/admin/club-applications/:applicationId/approve'),
    ({ params }) => {
      const applicationId = Number(params.applicationId);
      if (!knownApplicationIds.has(applicationId)) {
        return notFound(40407, '동아리 생성 신청을 찾을 수 없습니다.');
      }
      return new HttpResponse(null, { status: 200 });
    },
  ),

  http.post(
    url('/admin/club-applications/:applicationId/reject'),
    ({ params }) => {
      const applicationId = Number(params.applicationId);
      if (!knownApplicationIds.has(applicationId)) {
        return notFound(40407, '동아리 생성 신청을 찾을 수 없습니다.');
      }
      return new HttpResponse(null, { status: 200 });
    },
  ),
];
