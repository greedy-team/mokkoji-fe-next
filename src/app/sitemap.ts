import { MetadataRoute } from 'next';
import { ApiResponse } from '@/shared/model/type';
import { Club, ClubsResponse } from '@/widgets/club/model/type';
import serverApi from '@/shared/api/server-api';
import { universityDisplayName } from '@/shared/lib/universityMeta';
import { toUrlCode } from '@/shared/lib/urlCodeConverter';

const BASE_URL = 'https://mokkoji.site';
const CLUB_PAGE_SIZE = 100;

// Dockerfile이 NEXT_PUBLIC_API_URL을 빌드 ARG로 받지 않아, 빌드 타임 생성이면
// clubs 조회가 전부 실패해 동아리 상세 URL이 통째로 누락된다.
export const dynamic = 'force-dynamic';

const UNIVERSITY_STATIC_PATHS = [
  { path: '', changeFrequency: 'daily', priority: 1.0 },
  { path: '/club', changeFrequency: 'daily', priority: 1.0 },
] as const;

// 학교와 무관하게 본문이 같아, 각 페이지의 canonical이 가리키는 사본만 싣는다
const DEDUPED_STATIC_PATHS = [
  { path: '/support', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/privacy-policy', changeFrequency: 'monthly', priority: 0.5 },
] as const;

const CANONICAL_UNIVERSITY_CODE = 'sejong';

function fetchClubPage(universityCode: string, page: number) {
  return serverApi
    .get('clubs', {
      searchParams: {
        page: String(page),
        size: String(CLUB_PAGE_SIZE),
        universityCode,
      },
      next: { tags: ['clubs'], revalidate: 3600 },
    } as Parameters<typeof serverApi.get>[1])
    .json<ApiResponse<ClubsResponse>>();
}

// 모집공고가 없으면 상세 페이지가 본문 없이 안내 문구만 렌더하므로 색인 요청 대상에서 뺀다
function hasRecruitment(club: Club): boolean {
  return club.recruitmentPreviewResponse !== null;
}

async function getClubIds(universityCode: string): Promise<number[]> {
  try {
    const firstPageResponse = await fetchClubPage(universityCode, 1);
    if (!firstPageResponse.data) return [];

    const { clubs, page } = firstPageResponse.data;
    const allIds = clubs.filter(hasRecruitment).map((club) => club.id);

    const remainingPages = Array.from(
      { length: page.totalPages - 1 },
      (_, index) => index + 2,
    );

    const remainingPageResponses = await Promise.all(
      remainingPages.map((pageNumber) =>
        fetchClubPage(universityCode, pageNumber),
      ),
    );

    remainingPageResponses.forEach((pageResponse) => {
      pageResponse.data?.clubs
        .filter(hasRecruitment)
        .forEach((club) => allIds.push(club.id));
    });

    return allIds;
  } catch (error) {
    console.error(`[sitemap] ${universityCode} 동아리 목록 조회 실패`, error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const universityApiCodes = Object.keys(universityDisplayName);
  const lastModified = new Date();

  const clubIdsPerUniversity = await Promise.all(
    universityApiCodes.map((apiCode) => getClubIds(apiCode)),
  );

  const universityPages = universityApiCodes.flatMap((apiCode, index) => {
    const universityCode = toUrlCode(apiCode);

    const staticPages: MetadataRoute.Sitemap = UNIVERSITY_STATIC_PATHS.map(
      ({ path, changeFrequency, priority }) => ({
        url: `${BASE_URL}/${universityCode}${path}`,
        lastModified,
        changeFrequency,
        priority,
      }),
    );

    const clubPages: MetadataRoute.Sitemap = clubIdsPerUniversity[index].map(
      (id) => ({
        url: `${BASE_URL}/${universityCode}/club/${id}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.8,
      }),
    );

    return [...staticPages, ...clubPages];
  });

  const dedupedPages: MetadataRoute.Sitemap = DEDUPED_STATIC_PATHS.map(
    ({ path, changeFrequency, priority }) => ({
      url: `${BASE_URL}/${CANONICAL_UNIVERSITY_CODE}${path}`,
      lastModified,
      changeFrequency,
      priority,
    }),
  );

  // 루트는 미들웨어가 기본 학교 홈으로 리다이렉트하므로 최종 URL만 싣는다
  return [...universityPages, ...dedupedPages];
}
