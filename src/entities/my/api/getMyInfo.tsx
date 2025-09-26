import api from '@/shared/api/auth-api';
import { ApiResponse } from '@/shared/model/type';
import ErrorHandler from '@/shared/lib/error-message';
import UserInfoType from '../model/type';

async function getMyInfo() {
  try {
    const response: ApiResponse<UserInfoType> = await api
      .get('users', {
        cache: 'force-cache',
        next: { revalidate: 3600, tags: ['users'] },
      })
      .json();
    return {
      ok: true,
      data: response.data,
      status: 200,
    };
  } catch (error) {
    return ErrorHandler(error as Error);
  }
}

export default getMyInfo;
