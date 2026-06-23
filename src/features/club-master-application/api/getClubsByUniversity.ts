'use server';

import { unstable_cache } from 'next/cache';
import serverApi from '@/shared/api/server-api';
import type { ClubSummary } from '../model/type';

interface AllClubsApiResponse {
  data: {
    clubs: ClubSummary[];
  };
}

const fetchClubsByUniversity = unstable_cache(
  async (universityCode: string): Promise<ClubSummary[]> => {
    const response = await serverApi
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
): Promise<ClubSummary[]> {
  try {
    return await fetchClubsByUniversity(universityCode);
  } catch {
    return [];
  }
}

export default getClubsByUniversity;
