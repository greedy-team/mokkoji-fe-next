import serverApi from '@/shared/api/server-api';

async function putEmail(email: string, status: string, accessToken?: string) {
  if (status !== 'authenticated' || !accessToken) {
    throw new Error('인증되지 않은 사용자 입니다.');
  }
  const response = await serverApi
    .put('users', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      json: { email },
    })
    .json();

  return response;
}

export default putEmail;
