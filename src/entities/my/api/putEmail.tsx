'use server';

import authApi from '@/shared/api/auth-api';
import ErrorHandler from '@/shared/lib/error-message';

async function putEmail(email: string) {
  try {
    const response = await (
      await authApi()
    )
      .put('users', {
        json: { email },
      })
      .json();

    return { ok: true, message: '이메일이 변경되었습니다.' };
  } catch (e) {
    return ErrorHandler(e as Error);
  }
}

export default putEmail;
