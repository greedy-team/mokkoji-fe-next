'use server';

import api from '@/shared/api/auth-api';
import ErrorHandler from '@/shared/lib/error-message';

async function deleteUser() {
  try {
    await api.delete('users');

    return {
      ok: true,
      message: '회원 탈퇴가 완료되었습니다.',
      status: 200,
    };
  } catch (e) {
    return ErrorHandler(e as Error);
  }
}

export default deleteUser;
