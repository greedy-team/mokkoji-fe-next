import serverApi from '@/shared/api/server-api';
import { ClubInfoResponse, GetClubManageInfoResponse } from '../model/type';

export default async function getClubManageInfo(
  accessToken: string,
): Promise<GetClubManageInfoResponse> {
  const response = await serverApi
    .get('users/manage/clubs', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .json<GetClubManageInfoResponse>();

  return response;
}

export async function getClubInfo(
  clubId: number,
  accessToken: string,
): Promise<ClubInfoResponse> {
  const response = await serverApi
    .get(`clubs/${clubId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .json<ClubInfoResponse>();

  return response;
}
