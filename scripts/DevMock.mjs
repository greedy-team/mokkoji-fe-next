import { spawn } from 'node:child_process';
import { rmSync } from 'node:fs';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const nextBin = createRequire(import.meta.url).resolve('next/dist/bin/next');
const MOCK_OAUTH_PORT = 3999;

// force-cache·unstable_cache 응답이 여기 저장되어, 비우지 않으면 실제 응답과 목업 응답이 서로 섞인다
const clearFetchCache = () =>
  rmSync(new URL('../.next/cache/fetch-cache', import.meta.url), {
    recursive: true,
    force: true,
  });

// 카카오 로그인은 페이지 이동이라 MSW가 가로채지 못한다.
// 카카오 인가 서버 대신 동의 없이 바로 인가 코드를 붙여 redirect_uri로 돌려보낸다
const mockOAuthServer = createServer((request, response) => {
  const { searchParams } = new URL(request.url, 'http://localhost');
  const redirectUri = searchParams.get('redirect_uri');
  if (!redirectUri) {
    response.writeHead(400).end('redirect_uri is required');
    return;
  }

  const callbackUrl = new URL(redirectUri);
  callbackUrl.searchParams.set('code', 'mock');
  callbackUrl.searchParams.set('state', searchParams.get('state') ?? '');
  response.writeHead(302, { Location: callbackUrl.toString() }).end();
});

clearFetchCache();
mockOAuthServer.listen(MOCK_OAUTH_PORT);

const child = spawn(
  process.execPath,
  [nextBin, 'dev', '--turbopack', '--port', '3000'],
  {
    cwd: projectRoot,
    stdio: 'inherit',
    env: {
      ...process.env,
      NEXT_PUBLIC_API_MOCKING: 'enabled',
      NEXT_PUBLIC_KAKAO_AUTH_URL: `http://localhost:${MOCK_OAUTH_PORT}/oauth/authorize`,
    },
  },
);

// Ctrl+C는 자식에도 전달되므로 부모는 자식이 끝날 때까지 기다렸다가 정리한다
process.on('SIGINT', () => {});
child.on('exit', (code) => {
  mockOAuthServer.close();
  clearFetchCache();
  process.exit(code ?? 0);
});
