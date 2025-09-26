'use server';

import api from '@/shared/api/auth-api';
import {
  ApiResponse,
  ClubInfoResponse,
  GetClubManageInfoResponse,
} from '../model/type';
import ErrorHandler from '../lib/error-message';

export default async function getClubManageInfo() {
  try {
    const response = await api
      .get('users/manage/clubs')
      .json<ApiResponse<GetClubManageInfoResponse>>();

    return { ok: true, message: '성공', data: response.data, status: 200 };
  } catch (err) {
    return ErrorHandler(err as Error);
  }
}

export async function getClubInfo(clubId: number) {
  try {
    const response = await api.get(`clubs/${clubId}`).json<ClubInfoResponse>();

    return { ok: true, message: '성공', data: response.data };
  } catch (err) {
    return ErrorHandler(err as Error);
  }
}
