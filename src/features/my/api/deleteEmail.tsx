'use server';

import api from '@/shared/api/auth-api';
import ErrorHandler from '@/shared/lib/error-message';
import { revalidateTag } from 'next/cache';

async function deleteEmail() {
  try {
    const response = await api.patch('users', {
      json: { email: '', isEmailOn: false },
    });

    const data = await response.json();
    revalidateTag('users');
    return {
      ok: true,
      message: '이메일이 삭제되었습니다.',
      data,
      status: 200,
    };
  } catch (e) {
    return ErrorHandler(e as Error);
  }
}

export default deleteEmail;
