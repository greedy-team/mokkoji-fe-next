'use server';

import api from '@/shared/api/auth-api';
import {
  ApiResponse,
  ClubInfoResponse,
  ClubList,
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

    if (role === UserRole.GREEDY_ADMIN) {
      const response = await api
        .get('clubs', { searchParams: { page: 0, size: 1000 } })
        .json<ApiResponse<ClubList>>();

      const clubs = (response.data?.clubs ?? []).map((club) => ({
        clubId: club.id,
        clubName: club.name,
      }));

      return { ok: true, message: '성공', data: { clubs }, status: 200 };
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
