import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

// jsdom·testing-library가 없어 훅을 렌더할 수 없으므로 소스를 정적으로 검사한다.
// 노리는 회귀는 하나다: effect 의존성에 매 렌더 새로 만들어지는 값이 들어가
// EventSource가 중복으로 열리는 것. 2026-11-25에 router를 넣어 실제로 겪었고,
// dev 로그에 한 사용자의 subscribe 연결이 4개 쌓였다.
const source = readFileSync(
  'src/entities/notification/lib/useNotificationStream.ts',
  'utf8',
);

const dependencyArray = source.match(/\n\s*\}, \[([^\]]*)\]\);/);

test('SSE effect의 의존성 배열을 찾을 수 있다', () => {
  assert.ok(dependencyArray, 'useEffect 의존성 배열을 찾지 못했다');
});

test('SSE effect는 status에만 의존한다', () => {
  const dependencies = dependencyArray![1]
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);

  assert.deepEqual(
    dependencies,
    ['status'],
    `의존성에 ${dependencies.join(', ')}가 있다. router·queryClient처럼 매 렌더 ` +
      '새로 만들어지는 값을 넣으면 effect가 재실행돼 EventSource가 중복으로 열린다. ' +
      'ref로 넘길 것.',
  );
});

test('effect 안에서 router·queryClient를 직접 쓰지 않는다', () => {
  const effectBody = source
    .slice(source.indexOf('useEffect(() => {'), source.lastIndexOf('}, ['))
    // 주석 안의 router.refresh() 언급은 코드가 아니다
    .replace(/\/\/[^\n]*/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '');

  // ref 경유(routerRef.current)는 허용, 직접 참조(router.)는 금지
  assert.doesNotMatch(
    effectBody,
    /(?<!Ref\.current)\brouter\.(refresh|push|replace)\(/,
    'effect 안에서 router를 직접 호출하면 의존성을 되돌리기 쉽다. routerRef.current를 쓸 것',
  );
  assert.doesNotMatch(
    effectBody,
    /(?<!Ref\.current)\bqueryClient\.invalidateQueries\(/,
    'effect 안에서 queryClient를 직접 쓰면 의존성을 되돌리기 쉽다. queryClientRef.current를 쓸 것',
  );
});

test('연결 해제가 cleanup에 있다', () => {
  const cleanup = source.slice(source.lastIndexOf('return () =>'));

  assert.match(
    cleanup,
    /source\.close\(\)/,
    'cleanup에서 close하지 않으면 언마운트 후에도 연결이 남는다',
  );
});

test('페이지를 떠날 때도 연결을 닫는다', () => {
  // 브라우저의 정리를 기다리면 서버가 최대 30초간 emitter를 들고 있어,
  // HTTP/1.1의 호스트당 연결 6개 제한을 SSE가 잠식한다.
  assert.match(
    source,
    /addEventListener\('pagehide'/,
    'pagehide에서 close하지 않으면 새로고침 때마다 연결이 쌓인다',
  );
  assert.match(
    source,
    /removeEventListener\('pagehide'/,
    'cleanup에서 리스너를 떼지 않으면 언마운트 후에도 핸들러가 남는다',
  );
});

test('적용한 role을 기억해 같은 변경을 반복하지 않는다', () => {
  // 쿠키를 갱신해도 AppSessionProvider의 session은 그대로라, session?.role을
  // 매 렌더 덮어쓰면 재연결마다 같은 변경이 다시 적용되고 refresh()가 반복된다.
  // 반복되는 refresh는 진행 중인 문서·API 요청을 취소시킨다(실제로 겪음).
  assert.doesNotMatch(
    source,
    /^\s*roleRef\.current = session\?\.role;\s*$/m,
    'roleRef를 매 렌더 session?.role로 덮어쓰면 낡은 값이 되살아난다',
  );

  assert.match(
    source,
    /roleRef\.current = role;/,
    '서버에 보내기 전에 적용한 role을 기록해야 중복 적용을 막는다',
  );
});

test('재연결에 상한과 백오프가 있다', () => {
  // EventSource의 자동 재연결은 끌 수 없고 횟수 제한도 없다. 연결이 계속
  // 실패하면 3초마다 영원히 재시도하는데, 매 시도가 백엔드에서 DB 커넥션을
  // 쓰기 때문에(subscribe → getUserRole) 풀이 고갈돼 알림과 무관한 요청까지
  // 30초 타임아웃이 난다. 실제로 겪은 장애다.
  assert.match(
    source,
    /retryCount > MAX_RETRY_COUNT/,
    '재시도 횟수에 상한이 없으면 실패가 계속될 때 백엔드 커넥션을 소진한다',
  );

  assert.match(
    source,
    /Math\.min\(/,
    '백오프에 상한이 없으면 지연이 무한정 커진다',
  );

  assert.match(
    source,
    /source\.close\(\);/,
    'error에서 close하지 않으면 EventSource가 자체 재연결을 계속한다',
  );
});

test('언마운트 후에는 재연결하지 않는다', () => {
  assert.match(
    source,
    /stopped = true;/,
    '정리 후에도 예약된 재연결이 남으면 떠난 페이지가 연결을 연다',
  );
  assert.match(
    source,
    /clearTimeout\(retryTimer\)/,
    '예약된 재연결 타이머를 지워야 한다',
  );
});

test('쿠키 갱신이 성공한 뒤에만 role을 기록한다', () => {
  // 실패했는데 roleRef를 먼저 바꿔두면, 재연결에서 같은 role을 받아도
  // "이미 반영됨"으로 보고 재시도하지 않는다.
  const syncCall = source.indexOf('await patchSessionRole(');
  const okCheck = source.indexOf('if (!ok) return;');
  const record = source.indexOf('roleRef.current = role;');

  assert.ok(syncCall !== -1, 'patchSessionRole 호출을 찾지 못했다');
  assert.ok(
    syncCall < okCheck && okCheck < record,
    '서버가 확정한 role을 실패 확인 뒤에 기록해야 다음 connect에서 재시도한다',
  );
});

test('bfcache 복원 시 연결을 다시 연다', () => {
  // pagehide에서 닫은 뒤 뒤로가기로 복원되면 effect가 다시 돌지 않는다.
  // pageshow에서 되살리지 않으면 이후 알림과 권한 변경을 받지 못한다.
  assert.match(
    source,
    /addEventListener\('pageshow'/,
    'pageshow에서 재연결하지 않으면 bfcache 복원 후 알림이 끊긴다',
  );
  assert.match(
    source,
    /event\.persisted/,
    'bfcache 복원(persisted)일 때만 재연결해야 한다',
  );
  assert.match(
    source,
    /removeEventListener\('pageshow'/,
    'cleanup에서 리스너를 떼야 한다',
  );
});
