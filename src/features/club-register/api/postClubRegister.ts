'use server';

import authAPi from '@/shared/api/auth-api';
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

export async function postClubRegister(data: ClubRegisterRequest) {
  const response = await (
    await authAPi()
  )
    .post('clubs', {
      json: data,
    })
    .json();

  return response;
}

export async function patchClubInfo(
  clubId: number,
  data: ClubUpdateRequest,
): Promise<EditResponse> {
  const response = await (
    await authAPi()
  )
    .patch(`clubs/manage/${clubId}`, {
      json: data,
    })
    .json<EditResponse>();

  return response;
}
