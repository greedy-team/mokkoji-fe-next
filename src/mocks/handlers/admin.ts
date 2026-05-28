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
    const page = Number(params.get('page') ?? 1);
    const size = Number(params.get('size') ?? 20);

    const filtered = status
      ? clubMasterApplications.filter((item) => item.status === status)
      : clubMasterApplications;

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
    const page = Number(params.get('page') ?? 1);
    const size = Number(params.get('size') ?? 20);

    return HttpResponse.json({
      data: {
        clubs: adminClubs,
        pagination: buildPage(adminClubs.length, page, size),
      },
    });
  }),

  http.get(url('/admin/club-applications'), ({ request }) => {
    const params = new URL(request.url).searchParams;
    const status = params.get('status') as ApplicationStatus | null;
    const page = Number(params.get('page') ?? 1);
    const size = Number(params.get('size') ?? 20);

    const filtered = status
      ? clubApplications.filter((item) => item.status === status)
      : clubApplications;

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
