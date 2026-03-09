'use server';

import api from '@/shared/api/auth-api';
import createErrorResponse from '@/shared/lib/error-message';
import { revalidateTag } from 'next/cache';

async function putEmail(email: string) {
  try {
    const response = await api.put('users', {
      json: { email },
    });

    const data = await response.json();
    revalidateTag('users');
    return {
      ok: true,
      message: '이메일이 변경되었습니다.',
      data,
      status: 200,
    };
  } catch (e) {
    return createErrorResponse(e as Error);
  }
}

export default putEmail;
