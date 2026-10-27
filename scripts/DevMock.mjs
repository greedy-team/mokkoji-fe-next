import { spawn } from 'node:child_process';
import { rmSync } from 'node:fs';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const nextBin = createRequire(import.meta.url).resolve('next/dist/bin/next');

// Windows의 Node는 localhost를 ::1로 먼저 해석할 수 있어 IPv4 주소를 고정한다
const MOCK_HOST = '127.0.0.1';
const MOCK_PORT = 4000;
const MOCK_ORIGIN = `http://${MOCK_HOST}:${MOCK_PORT}`;
// root-auth-api가 '/api/' 기준으로 루트 주소를 자르므로 실제 주소와 같은 경로 형식을 유지한다
const MOCK_API_URL = `${MOCK_ORIGIN}/api/dev`;

// 핸들러가 import 시점에 NEXT_PUBLIC_API_URL로 경로를 만들므로 import 전에 지정한다
process.env.NEXT_PUBLIC_API_URL = MOCK_API_URL;
const { getResponse } = await import('msw');
const { handlers } = await import('../src/mocks/handlers/index.ts');

const corsHeadersFor = (request) => ({
  'Access-Control-Allow-Origin': request.headers.origin ?? '*',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  // Authorization은 와일드카드(*)에 포함되지 않아 브라우저가 요청한 헤더를 그대로 허용한다
  'Access-Control-Allow-Headers':
    request.headers['access-control-request-headers'] ?? '*',
});

const readBody = async (request) => {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  return Buffer.concat(chunks);
};

// 카카오 로그인은 페이지 이동이라 핸들러로 응답할 수 없다.
// 카카오 인가 서버 대신 동의 없이 바로 인가 코드를 붙여 redirect_uri로 돌려보낸다
const redirectToCallback = (url, response) => {
  const redirectUri = url.searchParams.get('redirect_uri');
  if (!redirectUri) {
    response.writeHead(400).end('redirect_uri is required');
    return;
  }

  const callbackUrl = new URL(redirectUri);
  callbackUrl.searchParams.set('code', 'mock');
  callbackUrl.searchParams.set('state', url.searchParams.get('state') ?? '');
  response.writeHead(302, { Location: callbackUrl.toString() }).end();
};

const mockServer = createServer(async (request, response) => {
  const url = new URL(request.url, MOCK_ORIGIN);
  const corsHeaders = corsHeadersFor(request);

  if (request.method === 'OPTIONS') {
    response.writeHead(204, corsHeaders).end();
    return;
  }

  if (url.pathname === '/oauth/authorize') {
    redirectToCallback(url, response);
    return;
  }

  const hasBody = request.method !== 'GET' && request.method !== 'HEAD';
  const mockRequest = new Request(url, {
    method: request.method,
    headers: Object.entries(request.headers).flatMap(([name, value]) =>
      value === undefined ? [] : [[name, String(value)]],
    ),
    body: hasBody ? await readBody(request) : undefined,
  });

  const mockResponse = await getResponse(handlers, mockRequest);
  if (!mockResponse) {
    console.warn(`[mock] 핸들러 없음: ${request.method} ${url.pathname}`);
    response
      .writeHead(404, { ...corsHeaders, 'Content-Type': 'application/json' })
      .end(JSON.stringify({ code: 404, message: '목업 핸들러가 없습니다.' }));
    return;
  }

  response.writeHead(mockResponse.status, {
    ...Object.fromEntries(mockResponse.headers),
    ...corsHeaders,
  });
  response.end(Buffer.from(await mockResponse.arrayBuffer()));
});

// force-cache·unstable_cache에 남은 이전 실행의 목업 응답이 바뀐 핸들러 대신 보이지 않도록 비운다
rmSync(new URL('../.next/cache/fetch-cache', import.meta.url), {
  recursive: true,
  force: true,
});

mockServer.listen(MOCK_PORT, MOCK_HOST);

const child = spawn(
  process.execPath,
  [nextBin, 'dev', '--turbopack', '--port', '3000'],
  {
    cwd: projectRoot,
    stdio: 'inherit',
    env: {
      ...process.env,
      NEXT_PUBLIC_API_URL: MOCK_API_URL,
      NEXT_PUBLIC_KAKAO_AUTH_URL: `${MOCK_ORIGIN}/oauth/authorize`,
    },
  },
);

// Ctrl+C는 자식에도 전달되므로 부모는 자식이 끝날 때까지 기다렸다가 정리한다
process.on('SIGINT', () => {});
child.on('exit', (code) => {
  mockServer.close();
  process.exit(code ?? 0);
});
