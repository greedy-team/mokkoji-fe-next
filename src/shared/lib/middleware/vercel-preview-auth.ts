import { NextRequest, NextResponse } from 'next/server';

/**
 * Vercel Preview 배포(dev.mokkoji.site) 접근 제한.
 * 앱 인증이 아니라 배포 환경 단위의 게이트라서, 팀원이 어디서 접속하든
 * 공유된 계정으로만 들어올 수 있도록 IP 제한 대신 Basic Auth를 쓴다.
 *
 * @returns Preview 환경이 아니거나 인증에 성공하면 null — 호출부가 앱 흐름으로 넘긴다
 */
export default function handleVercelPreviewAuth(
  req: NextRequest,
): NextResponse | null {
  if (process.env.VERCEL_ENV !== 'preview') return null;

  const expectedUser = process.env.DEVELOPER_ACCESS_USER;
  const expectedPassword = process.env.DEVELOPER_ACCESS_PASSWORD;
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
