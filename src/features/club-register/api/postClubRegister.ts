'use server';

import serverApi from '@/shared/api/server-api';
import { ClubFormData } from '../model/type';

export default async function postClubRegister(data: ClubFormData) {
  const response = await serverApi
    .post('clubs/manage', {
      json: data,
    })
    .json();

  return response;
}
