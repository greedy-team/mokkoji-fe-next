import { ApiResponse } from '@/shared/model/type';

interface LoginRes {
  accessToken: string;
  refreshToken: string;
}

export interface LoginSuccessResponse extends ApiResponse<LoginRes> {}

export interface ManageClub {
  clubId: number;
  clubName: string;
}

export interface ManageClubResponse {
  data: { clubs: ManageClub[] };
}

export interface RoleResponse extends ApiResponse<{ role: string }> {}
