import serverApi from '@/shared/api/server-api';
import {
  ApiResponse,
  ClubListRaw,
  ClubType,
  Pagination,
  mapClubType,
} from '@/shared/model/type';

interface Params {
  page: number;
  size: number;
  universityCode: string;
}

interface ClubsData {
  clubs: ClubType[];
  page: Pagination;
}

async function getManagementClubs(params: Params): Promise<ClubsData | null> {
  try {
    const response = await serverApi
      .get('clubs', {
        searchParams: {
          page: params.page,
          size: params.size,
          universityCode: params.universityCode,
        },
      })
      .json<ApiResponse<ClubListRaw & { page: Pagination }>>();

    const responseData = response.data;
    if (!responseData) return null;

    return {
      clubs: responseData.clubs.map(mapClubType),
      page: responseData.page,
    };
  } catch (error) {
    console.error('[getManagementClubs]', error);
    return null;
  }
}

export default getManagementClubs;
