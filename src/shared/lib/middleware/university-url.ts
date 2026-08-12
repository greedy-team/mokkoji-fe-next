import { NextRequest, NextResponse } from 'next/server';
import { toUrlCode } from '@/shared/lib/urlCodeConverter';
import { publicRoutes } from '../../../../route';

/**
 * URL의 첫 세그먼트(학교 코드) 판별과 방어를 담당한다.
 * 경로가 소문자 학교 코드라는 전제를 여기서 보장하고, 나머지 미들웨어 로직은 그 전제 위에서 동작한다.
 */

const NON_UNIVERSITY_PREFIXES = new Set(['admin', 'api', 'test', '_next']);

export const DEFAULT_UNIVERSITY_CODE = 'sejong';

/**
 * 첫 세그먼트가 학교 코드 자리면 그대로 반환한다. 아니면 null.
 * 대문자도 인식해야 정규화 리다이렉트로 넘길 수 있어 대소문자를 가리지 않는다.
 */
function getUniversitySegment(pathname: string): string | null {
  const firstSegment = pathname.split('/')[1];
  if (
    firstSegment &&
    !NON_UNIVERSITY_PREFIXES.has(toUrlCode(firstSegment)) &&
    /^[a-zA-Z]+$/.test(firstSegment)
  ) {
    return firstSegment;
  }
  return null;
}

/**
 * 대문자 학교 코드로 들어오면 소문자 경로로 리다이렉트한다.
 * 정규화하지 않으면 공개 경로 판별이 실패해 기본 학교의 로그인 페이지로 튕긴다.
 * 이미 소문자면 null을 반환하므로 리다이렉트 루프는 없다.
 */
export function normalizeUniversityCodeCasing(
  req: NextRequest,
): NextResponse | null {
  const segment = getUniversitySegment(req.nextUrl.pathname);
  if (!segment || segment === toUrlCode(segment)) return null;

  const url = req.nextUrl.clone();
  const segments = url.pathname.split('/');
  segments[1] = toUrlCode(segment);
  url.pathname = segments.join('/');

  return NextResponse.redirect(url);
}

function stripUniversityCodePrefix(pathname: string): string {
  if (!getUniversitySegment(pathname)) return pathname;
  return `/${pathname.split('/').slice(2).join('/')}` || '/';
}

export function extractUniversityCode(pathname: string): string {
  const segment = getUniversitySegment(pathname);
  return segment ? toUrlCode(segment) : DEFAULT_UNIVERSITY_CODE;
}

/**
 * route.ts에 정의된 publicRoutes와 대조하여 인증 없이 접근 가능한 경로인지 판별한다.
 * '/:path*'로 끝나는 패턴은 하위 경로까지 포함한다.
 * /{universityCode}/... 형태의 경로는 universityCode를 제거한 뒤 대조한다.
 */
export function isPublicPath(pathname: string): boolean {
  const normalizedPath = stripUniversityCodePrefix(pathname);
  return publicRoutes.some((route) => {
    if (route.endsWith('/:path*')) {
      return normalizedPath.startsWith(route.replace('/:path*', ''));
    }
    return route === normalizedPath;
  });
}
