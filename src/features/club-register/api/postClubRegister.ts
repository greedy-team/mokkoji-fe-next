import serverApi from '@/shared/api/server-api';
import { ClubInfoData, GetManagedClubResponse } from '../model/type';

export async function postClubRegister(data: FormData, accessToken: string) {
  const response = await serverApi
    .post('clubs/manage', {
      json: data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .json();

  return response;
}

export async function getManagedClub(
  accessToken: string,
): Promise<GetManagedClubResponse> {
  const response = await serverApi
    .get('users/manage/clubs', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .json<GetManagedClubResponse>();

  return response;
}

export async function patchClubManage(
  data: FormData,
  accessToken: string,
  clubId?: number,
) {
  const response = await serverApi
    .patch(`clubs/manage/${clubId}`, {
      body: data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .json();

  return response;
}

/*
export async function patchClubManage(
  data: FormData,
  accessToken: string,
  clubId?: number,
) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clubs/manage/${clubId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: data,
  });

  const result = await response.json();
  return result;
}
*/
export async function getManagedClubInfo(
  accessToken: string,
  clubId?: number,
): Promise<{ data: ClubInfoData }> {
  const response = await serverApi
    .get(`clubs/manage/${clubId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .json<{ data: ClubInfoData }>();

  return response;
}
