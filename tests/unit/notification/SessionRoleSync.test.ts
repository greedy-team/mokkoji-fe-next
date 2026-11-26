import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

// 라우트는 server-only·next/headers에 묶여 Node 테스트에서 import할 수 없어 소스를 정적으로 검사한다.
// 노리는 회귀: 쿠키에 쓸 role을 클라이언트가 보내면 콘솔에서 임의 role을 보내 쿠키를 바꿀 수 있다.
const stripComments = (code: string) =>
  code.replace(/\/\/[^\n]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '');

const route = stripComments(
  readFileSync('src/app/api/auth/session/role/route.ts', 'utf8'),
);
const client = stripComments(
  readFileSync('src/entities/notification/api/patchSessionRole.ts', 'utf8'),
);
const stream = stripComments(
  readFileSync(
    'src/entities/notification/lib/useNotificationStream.ts',
    'utf8',
  ),
);

test('세션 role 라우트는 요청 body를 읽지 않는다', () => {
  assert.doesNotMatch(
    route,
    /request\.json\(/,
    'body의 role을 쓰면 클라이언트가 임의 role로 쿠키를 바꿀 수 있다',
  );
});

test('세션 role 라우트는 백엔드에서 조회한 role로 갱신한다', () => {
  assert.match(
    route,
    /getMyInfo\(/,
    '쿠키에 쓸 role은 백엔드 GET users 응답에서 가져와야 한다',
  );
  assert.match(
    route,
    /resolveRoleChange\(/,
    'null 무시와 관리자 보호 규칙을 서버에서도 적용해야 한다',
  );
});

test('클라이언트는 role 값을 보내지 않는다', () => {
  assert.doesNotMatch(
    client,
    /json:/,
    'role을 body에 실으면 라우트가 다시 클라이언트 값을 믿게 된다',
  );
});

test('role-changed는 별도 role 조회 없이 바로 동기화한다', () => {
  assert.doesNotMatch(
    stream,
    /getClientUserRole/,
    '라우트가 직접 조회하므로 클라이언트가 먼저 role을 물어볼 필요가 없다',
  );
});
