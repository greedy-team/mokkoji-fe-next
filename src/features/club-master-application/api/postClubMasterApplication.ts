'use server';

import api from '@/shared/api/auth-api';
import createErrorResponse from '@/shared/lib/error-message';
import type { ClubMasterApplicationFormData } from '../model/type';

async function postClubMasterApplication(data: ClubMasterApplicationFormData) {
  try {
    await api.post('club-master-applications', { json: data });
    return { ok: true, message: '동아리장 등록 신청이 완료되었습니다.' };
  } catch (error) {
    return createErrorResponse(error as Error, undefined, [403, 404, 409]);
  }
}

export default postClubMasterApplication;
