'use server';

import api from '@/shared/api/auth-api';
import type { ClubOption } from '../model/type';

interface ClubPreviewResponse {
  id: number;
  name: string;
}

interface AllClubsApiResponse {
  data: {
    clubs: ClubPreviewResponse[];
  };
}

async function getClubsByUniversity(
  universityCode: string,
): Promise<ClubOption[]> {
  try {
    const response = await api
      .get('clubs', {
        searchParams: {
          universityCode,
          page: 1,
          size: 200,
        },
      })
      .json<AllClubsApiResponse>();
    return response.data.clubs.map(({ id, name }) => ({ id, name }));
  } catch {
    return [];
  }
}

export default getClubsByUniversity;
