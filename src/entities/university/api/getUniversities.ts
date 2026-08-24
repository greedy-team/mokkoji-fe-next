import serverApi from '@/shared/api/server-api';
import createErrorResponse from '@/shared/lib/error-message';
import { ApiResponse } from '@/shared/model/type';
import { UniversitiesResponse } from '../model/type';

async function getUniversities() {
  try {
    const response = await serverApi
      .get('universities', {
        cache: 'force-cache',
        next: { tags: ['universities'], revalidate: 3600 },
      })
      .json<ApiResponse<UniversitiesResponse>>();

    const responseData = response.data;
    if (!responseData) return { ok: false, message: '데이터 없음' };

    return { ok: true, message: '성공', data: responseData };
  } catch (e) {
    return createErrorResponse(e as Error);
  }
}

export default getUniversities;
