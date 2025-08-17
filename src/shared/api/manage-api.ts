'use server';

import authApi from '@/shared/api/auth-api';
import { ClubInfoResponse, GetClubManageInfoResponse } from '../model/type';

export default async function getClubManageInfo(): Promise<GetClubManageInfoResponse> {
  const response = await (await authApi())
    .get('users/manage/clubs')
    .json<GetClubManageInfoResponse>();

  return response;
}

export async function getClubInfo(clubId: number): Promise<ClubInfoResponse> {
  const response = await (await authApi())
    .get(`clubs/${clubId}`)
    .json<ClubInfoResponse>();

  return response;
}
