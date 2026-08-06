import { NextRequest } from 'next/server';
import handleDashboardAuth from '@/shared/lib/middleware/dashboard-auth';
import handleMainAuth from '@/shared/lib/middleware/main-auth';
import { normalizeUniversityCodeCasing } from '@/shared/lib/middleware/university-url';

export default async function middleware(req: NextRequest) {
  // 대시보드는 학교 코드 체계도 세션도 별개라 가장 먼저 분리한다
  const dashboardResponse = handleDashboardAuth(req);
  if (dashboardResponse) return dashboardResponse;

  // 이후 경로 판별이 소문자 코드를 전제하므로 세션 처리 전에 정규화한다
  const casingRedirect = normalizeUniversityCodeCasing(req);
  if (casingRedirect) return casingRedirect;

  return handleMainAuth(req);
}

// 정적 자산은 인증과 무관하므로 제외한다. 특히 폰트는 페이지당 수십 개가
// 동시에 요청되어, 통과시키면 요청마다 토큰 갱신 fetch가 발생할 수 있다.
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico|mockServiceWorker.js|.*\\.svg$|.*\\.png$|.*\\.gif$|.*\\.woff2$|sitemap\\.xml|robots\\.txt|ads\\.txt).*)',
  ],
};
