'use server';

import authAPi from '@/shared/api/auth-api';
import ErrorHandler from '@/shared/lib/error-message';
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
  try {
    await (
      await authAPi()
    )
      .post('clubs', {
        json: data,
      })
      .json();

    return { ok: true, message: '등록이 완료되었습니다.' };
  } catch (e) {
    return ErrorHandler(e as Error);
  }
}

export async function patchClubInfo(
  clubId: number,
  data: ClubUpdateRequest,
): Promise<EditResponse> {
  try {
    const response = await (
      await authAPi()
    )
      .patch(`clubs/manage/${clubId}`, {
        json: data,
      })
      .json<EditResponse>();

    return { ok: true, message: '수정이 완료되었습니다.', data: response.data };
  } catch (e) {
    return ErrorHandler(e as Error);
  }
}
