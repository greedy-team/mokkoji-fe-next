import serverApi from '@/shared/api/server-api';
import { toApiCode } from '@/shared/lib/urlCodeConverter';
import type { ApiResponse, ClubType } from '@/shared/model/type';

export interface ClubName {
  id: number;
  name: string;
}

// 인증이 필요 없는 공개 목록이라 Route Handler 없이 브라우저에서 백엔드를 직접 호출한다
async function getClientClubNameList(
  universityCode: string,
): Promise<ClubName[]> {
  const response = await serverApi
    .get('clubs', {
      searchParams: {
        universityCode: toApiCode(universityCode),
        page: 1,
        size: 200,
      },
    })
    .json<ApiResponse<{ clubs: ClubType[] }>>();

  return (response.data?.clubs ?? []).map(({ id, name }) => ({ id, name }));
}

export default getClientClubNameList;
