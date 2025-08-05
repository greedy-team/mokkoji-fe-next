import serverApi from '@/shared/api/server-api';
import { GetClubManageInfoResponse } from '../model/type';

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
