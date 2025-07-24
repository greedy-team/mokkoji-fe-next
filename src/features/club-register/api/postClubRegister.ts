import serverApi from '@/shared/api/server-api';

export default async function postClubRegister(data: FormData) {
  const response = await serverApi
    .post('clubs/manage', {
      json: data,
    })
    .json();

  return response;
}
