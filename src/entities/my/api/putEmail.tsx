'use server';

import api from '@/shared/api/auth-api';
import ErrorHandler from '@/shared/lib/error-message';

async function putEmail(email: string) {
  try {
    const response = await api.put('users', {
      json: { email },
    });

    return { ok: true, message: '이메일이 변경되었습니다.' };
  } catch (e) {
    return ErrorHandler(e as Error);
  }
}

export default putEmail;
