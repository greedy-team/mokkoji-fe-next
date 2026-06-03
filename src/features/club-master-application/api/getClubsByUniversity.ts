'use server';

import { unstable_cache } from 'next/cache';
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

const fetchClubsByUniversity = unstable_cache(
  async (universityCode: string): Promise<ClubOption[]> => {
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
  },
  ['clubs-by-university'],
  { revalidate: 3600 },
);

async function getClubsByUniversity(
  universityCode: string,
): Promise<ClubOption[]> {
  try {
    return await fetchClubsByUniversity(universityCode);
  } catch {
    return [];
  }
}

export default getClubsByUniversity;
