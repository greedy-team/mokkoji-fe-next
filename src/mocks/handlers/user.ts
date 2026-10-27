/* eslint-disable import/no-extraneous-dependencies, import/prefer-default-export */
import { http, HttpResponse } from 'msw';
import type { GetClubManageInfoResponse } from '@/shared/model/type';
import type UserInfoType from '@/entities/my/model/type';
import { managedClubIds, mockClubs, mockUser, mockUserRole } from '../data';
import { apiUrl, type MockResponse } from '../response';

interface UserUpdateBody {
  email?: string;
  isEmailOn?: boolean;
  universityCode?: string;
}

export const userHandlers = [
  http.get<never, never, MockResponse<UserInfoType>>(apiUrl('/users'), () =>
    HttpResponse.json({ data: mockUser }),
  ),

  http.patch<never, UserUpdateBody, MockResponse<UserInfoType>>(
    apiUrl('/users'),
    async ({ request }) => {
      const body = await request.json();
      mockUser.email = body.email ?? mockUser.email;
      mockUser.emailOn = body.isEmailOn ?? mockUser.emailOn;
      mockUser.universityCode = body.universityCode ?? mockUser.universityCode;
      return HttpResponse.json({ data: mockUser });
    },
  ),

  http.delete(apiUrl('/users'), () => new HttpResponse(null, { status: 204 })),

  http.get<never, never, MockResponse<{ role: string }>>(
    apiUrl('/users/roles'),
    () => HttpResponse.json({ data: { role: mockUserRole } }),
  ),

  http.get<never, never, MockResponse<GetClubManageInfoResponse>>(
    apiUrl('/users/manage/clubs'),
    () =>
      HttpResponse.json({
        data: {
          clubs: mockClubs
            .filter((club) => managedClubIds.includes(club.id))
            .map((club) => ({ clubId: club.id, clubName: club.name })),
        },
      }),
  ),

  http.post(
    apiUrl('/feedbacks'),
    () => new HttpResponse(null, { status: 201 }),
  ),
];
