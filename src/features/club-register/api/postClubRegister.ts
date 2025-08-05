import serverApi from '@/shared/api/server-api';

export default async function postClubRegister(
  data: FormData,
  accessToken: string,
) {
  const response = await serverApi
    .post('clubs/manage', {
      json: data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .json();

  return response;
}
