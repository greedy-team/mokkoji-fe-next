import serverApi from '@/shared/api/server-api';

export async function postClubRegister(data: FormData) {
  const response = await serverApi
    .post('clubs/manage', {
      json: data,
    })
    .json();

  return response;
}

export async function getManagedClub() {
  const response = await serverApi.get('users/manage/clubs').json();

  return response;
}

export async function patchClubManage(data: FormData) {
  const clubId = await getManagedClub();

  const response = await serverApi
    .patch(`clubs/manage/${clubId}`, {
      json: data,
    })
    .json();

  return response;
}
