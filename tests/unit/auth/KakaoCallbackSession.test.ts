import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

// 콜백 라우트는 next/server·ky에 묶여 있어 소스를 정적으로 검사한다.
const callback = readFileSync(
  'src/app/api/auth/callback/kakao/route.ts',
  'utf8',
).replace(/\/\/[^\n]*/g, '');

test('로그인 세션 role은 유저 정보 응답에서 가져온다', () => {
  // 백엔드 GET users 응답(UserInformationResponse)에 role이 이미 들어 있다
  assert.doesNotMatch(
    callback,
    /'users\/roles'/,
    'GET users 응답에 role이 있으므로 users/roles를 따로 부를 필요가 없다',
  );
  assert.match(
    callback,
    /role: userResponseBody\.data\.role/,
    '세션 role은 GET users 응답의 role이어야 한다',
  );
});
