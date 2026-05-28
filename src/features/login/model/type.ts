import { ApiResponse } from '@/shared/model/type';

interface LoginTokenData {
  accessToken: string;
  refreshToken: string;
  isNewUser: boolean;
}

export interface LoginSuccessResponse extends ApiResponse<LoginTokenData> {}

export interface RoleResponse extends ApiResponse<{ role: string }> {}
