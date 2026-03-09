import { ApiResponse } from '@/shared/model/type';

interface LoginTokenData {
  accessToken: string;
  refreshToken: string;
}

export interface LoginSuccessResponse extends ApiResponse<LoginTokenData> {}

export interface ManageClub {
  clubId: number;
  clubName: string;
}

export interface ManageClubResponse {
  data: { clubs: ManageClub[] };
}

export interface RoleResponse extends ApiResponse<{ role: string }> {}
