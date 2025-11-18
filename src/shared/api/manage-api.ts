'use server';

import api from '@/shared/api/auth-api';
import {
  ApiResponse,
  ClubInfoResponse,
  GetClubManageInfoResponse,
  UserRole,
} from '../model/type';
import ErrorHandler from '../lib/error-message';

interface ClubManageInfoProps {
  role: UserRole | undefined;
}

export default async function getClubManageInfo({ role }: ClubManageInfoProps) {
  try {
    if (role === UserRole.NORMAL || !role) {
      return {
        ok: true,
        message: '권한이 없습니다.',
        data: null,
        status: 200,
      };
    }
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
