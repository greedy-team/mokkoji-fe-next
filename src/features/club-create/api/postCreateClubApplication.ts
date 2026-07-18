'use server';

import api from '@/shared/api/auth-api';
import createErrorResponse from '@/shared/lib/error-message';
import type {
  ClubApplicationCreateResponse,
  ClubCreateFormData,
} from '../model/type';

async function postCreateClubApplication(
  data: ClubCreateFormData & { applicantName: string },
): Promise<ClubApplicationCreateResponse> {
  try {
    const response = await api.post('club-applications', { json: data });
    const payload =
      await response.json<ClubApplicationCreateResponse['data']>();

    return {
      ok: true,
      message: '동아리 생성 신청이 완료되었습니다.',
      data: payload,
      status: 201,
    };
  } catch (error) {
    return createErrorResponse(error as Error, [
      { status: 409, message: '이미 신청된 동아리입니다.' },
    ]);
  }
}

export default postCreateClubApplication;
