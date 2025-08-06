import serverApi from '@/shared/api/server-api';
import { EditResponse } from '../model/type';

interface ClubRegisterRequest {
  name: string;
  category: string;
  affiliation: string;
  clubMasterStudentId: string;
}

interface ClubUpdateRequest {
  name: string;
  category: string;
  affiliation: string;
  description: string;
  instagram: string;
  logo: string;
}

export async function postClubRegister(
  data: ClubRegisterRequest,
  accessToken: string,
) {
  const response = await serverApi
    .post('clubs', {
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
  data: ClubUpdateRequest,
  accessToken: string,
): Promise<EditResponse> {
  const response = await serverApi
    .patch(`clubs/manage/${clubId}`, {
      json: data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .json<EditResponse>();

  return response;
}
