'use server';

import api from '@/shared/api/auth-api';
import ErrorHandler from '@/shared/lib/error-message';
import { revalidatePath } from 'next/cache';
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
    await api.post('clubs', {
      json: data,
    });
    revalidatePath('/club');

    return { ok: true, message: '등록이 완료되었습니다.', status: 200 };
  } catch (e) {
    return ErrorHandler(e as Error);
  }
}

export async function patchClubInfo(
  clubId: number,
  data: ClubUpdateRequest,
): Promise<EditResponse> {
  try {
    const response = await api.patch(`clubs/manage/${clubId}`, {
      json: data,
    });

    const payload = await response.json<EditResponse['data']>();

    revalidatePath('/club');

    return {
      ok: true,
      message: '수정이 완료되었습니다.',
      data: payload,
      status: 200,
    };
  } catch (e) {
    return ErrorHandler(e as Error);
  }
}
