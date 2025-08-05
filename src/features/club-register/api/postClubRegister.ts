import serverApi from '@/shared/api/server-api';
import { EditResponse } from '../model/type';

export default async function postClubRegister(
  data: FormData,
  accessToken: string,
) {
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

export async function patchClubInfo(
  clubId: number,
  data: FormData,
  accessToken: string,
): Promise<EditResponse> {
  const response = await serverApi
    .post(`clubs/manage/${clubId}`, {
      json: data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .json<EditResponse>();

  return response;
}
