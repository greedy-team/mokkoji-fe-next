import authApi from '@/shared/api/auth-api';
import { ApiResponse } from '@/shared/model/type';
import UserInfoType from '../model/type';

async function getMyInfo() {
  const response: ApiResponse<UserInfoType> = await (
    await authApi()
  )
    .get('users', {
      cache: 'force-cache',
      next: { revalidate: 3600, tags: ['users'] },
    })
    .json();
  return response.data;
}

export default getMyInfo;
