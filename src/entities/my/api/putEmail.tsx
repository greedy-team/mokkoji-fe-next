import authApi from '@/shared/api/auth-api';

async function putEmail(email: string, status: string) {
  if (status !== 'authenticated') {
    throw new Error('인증되지 않은 사용자 입니다.');
  }
  const response = await (
    await authApi()
  )
    .put('users', {
      json: { email },
    })
    .json();

  return response;
}

export default putEmail;
