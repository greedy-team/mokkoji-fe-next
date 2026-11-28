import assert from 'node:assert/strict';
import { test } from 'node:test';

import getNotificationHref from '@/entities/notification/lib/getNotificationHref';

test('동아리로 이동할 수 있는 알림은 상세 경로를 준다', () => {
  assert.equal(
    getNotificationHref(
      { type: 'CLUB_MASTER_APPROVED', targetId: 12 },
      'sejong',
    ),
    '/sejong/club/12',
  );
});

test('동아리 삭제 알림은 이동할 수 없다', () => {
  // 백엔드가 삭제된 동아리를 가리키지 않도록 targetId를 null로 보낸다.
  assert.equal(
    getNotificationHref({ type: 'CLUB_DELETED', targetId: null }, 'sejong'),
    null,
  );
});

test('targetId가 없으면 타입과 무관하게 이동하지 않는다', () => {
  assert.equal(
    getNotificationHref(
      { type: 'CLUB_APPLICATION_REJECTED', targetId: null },
      'sejong',
    ),
    null,
  );
});

test('targetId가 0이어도 경로를 만든다', () => {
  assert.equal(
    getNotificationHref(
      { type: 'CLUB_APPLICATION_APPROVED', targetId: 0 },
      'sejong',
    ),
    '/sejong/club/0',
  );
});
