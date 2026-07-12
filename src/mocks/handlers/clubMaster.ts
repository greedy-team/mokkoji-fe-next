/* eslint-disable import/no-extraneous-dependencies, import/prefer-default-export */
import { http, HttpResponse, passthrough } from 'msw';
import { getUniversityName } from '@/shared/lib/universityMeta';
import { clubApplications, myClubMasterApplications } from '../data';

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? '';

const url = (path: string) => `${baseUrl}${path}`;

export const clubMasterHandlers = [
  http.post(url('/club-applications'), () => passthrough()),

  http.get(url('/club-applications/me'), () =>
    HttpResponse.json({
      data: {
        clubApplications: clubApplications.map((application) => ({
          clubApplicationId: application.applicationId,
          universityName: application.universityName,
          clubName: application.clubName,
          status: application.status,
          rejectReason: application.rejectReason,
          createdAt: application.createdAt,
        })),
      },
    }),
  ),

  http.post(
    url('/club-master-applications'),
    () => new HttpResponse(null, { status: 201 }),
  ),

  http.get(url('/club-master-applications/me'), () =>
    HttpResponse.json({
      data: myClubMasterApplications.map((application) => ({
        id: application.id,
        universityName: getUniversityName(application.universityCode),
        clubName: application.clubName,
        userName: application.userName,
        status: application.status,
        rejectReason: application.rejectReason ?? null,
        createdAt: application.createdAt,
      })),
    }),
  ),

  http.post(
    url('/club-master-transfers'),
    () => new HttpResponse(null, { status: 201 }),
  ),

  http.patch(
    url('/club-master-transfers/:applicationId/approve'),
    () => new HttpResponse(null, { status: 200 }),
  ),
];
