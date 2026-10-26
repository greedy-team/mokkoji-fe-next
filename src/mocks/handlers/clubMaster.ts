/* eslint-disable import/no-extraneous-dependencies, import/prefer-default-export */
import dayjs from 'dayjs';
import { http, HttpResponse } from 'msw';
import { getUniversityName } from '@/shared/lib/universityMeta';
import type {
  ClubApplicationListType,
  MyClubMasterApplicationType,
} from '@/entities/my/model/type';
import type {
  ClubApplicationCreateBody,
  ClubCreateFormData,
} from '@/features/club-create/model/type';
import {
  clubApplications,
  mockUser,
  myClubApplications,
  myClubMasterApplications,
} from '../data';
import { apiUrl, storageUrl, type MockResponse } from '../response';

export const clubMasterHandlers = [
  http.post<
    never,
    Partial<ClubCreateFormData> & { applicantName?: string },
    ClubApplicationCreateBody
  >(apiUrl('/club-applications'), async ({ request }) => {
    const body = await request.json();
    const applicationId =
      Math.max(
        ...clubApplications.map((application) => application.applicationId),
      ) + 1;
    const universityName = getUniversityName(
      body.universityCode ?? mockUser.universityCode ?? 'SEJONG',
    );
    const createdAt = dayjs().format('YYYY-MM-DDTHH:mm:ss');

    clubApplications.unshift({
      applicationId,
      universityName,
      clubName: body.clubName ?? '',
      applicantName: body.applicantName ?? mockUser.name ?? '',
      category: body.clubCategory ?? 'OTHER',
      affiliation: body.clubAffiliation ?? 'CENTRAL_CLUB',
      description: body.description ?? '',
      logo: 'https://placehold.co/120x120/png?text=New',
      instagram: body.instagram ?? '',
      status: 'PENDING',
      rejectReason: null,
      createdAt,
    });
    myClubApplications.unshift({
      clubApplicationId: applicationId,
      universityName,
      clubName: body.clubName ?? '',
      status: 'PENDING',
      rejectReason: null,
      createdAt,
    });

    return HttpResponse.json(
      {
        data: {
          applicationId,
          uploadLogoUrl: storageUrl(`club-applications/${applicationId}/logo`),
        },
      },
      { status: 201 },
    );
  }),

  http.get<never, never, MockResponse<ClubApplicationListType>>(
    apiUrl('/club-applications/me'),
    () => HttpResponse.json({ data: { clubApplications: myClubApplications } }),
  ),

  http.post(
    apiUrl('/club-master-applications'),
    () => new HttpResponse(null, { status: 201 }),
  ),

  http.get<never, never, MockResponse<MyClubMasterApplicationType[]>>(
    apiUrl('/club-master-applications/me'),
    () => HttpResponse.json({ data: myClubMasterApplications }),
  ),

  http.post(
    apiUrl('/club-master-transfers'),
    () => new HttpResponse(null, { status: 201 }),
  ),

  http.patch(
    apiUrl('/club-master-transfers/:applicationId/approve'),
    () => new HttpResponse(null, { status: 200 }),
  ),
];
