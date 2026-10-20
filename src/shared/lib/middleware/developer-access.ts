import { NextRequest, NextResponse } from 'next/server';

/**
 * 개발 배포(dev.mokkoji.site) 접근 제한.
 * dev와 prod가 별도 Vercel 프로젝트이고 dev도 Production 환경으로 배포되므로
 * VERCEL_ENV로는 구분할 수 없다. 계정 환경변수가 등록된 프로젝트에서만 동작한다.
 * 팀원이 어디서 접속하든 들어올 수 있도록 IP 제한 대신 Basic Auth를 쓴다.
 *
 * @returns 계정이 등록되지 않은 프로젝트이거나 인증에 성공하면 null — 호출부가 앱 흐름으로 넘긴다
 */
export default function handleDeveloperAccess(
  req: NextRequest,
): NextResponse | null {
  const expectedUser = process.env.DEVELOPER_ACCESS_USER;
  const expectedPassword = process.env.DEVELOPER_ACCESS_PASSWORD;
  if (!expectedUser && !expectedPassword) return null;

  const credentials = parseBasicAuth(req.headers.get('authorization'));

  if (
    expectedUser &&
    expectedPassword &&
    credentials?.user === expectedUser &&
    credentials.password === expectedPassword
  )
    return null;

  return new NextResponse('Auth Required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Mokkoji Dev"' },
  });
}

function parseBasicAuth(header: string | null) {
  const [scheme, encoded] = header?.split(' ') ?? [];
  if (scheme !== 'Basic' || !encoded) return null;

  let decoded: string;
  try {
    decoded = atob(encoded);
  } catch {
    return null;
  }

  // 비밀번호에 ':'가 포함될 수 있어 첫 번째 구분자에서만 나눈다
  const separatorIndex = decoded.indexOf(':');
  if (separatorIndex === -1) return null;

  return {
    user: decoded.slice(0, separatorIndex),
    password: decoded.slice(separatorIndex + 1),
  };
}
