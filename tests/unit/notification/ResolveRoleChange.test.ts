import assert from 'node:assert/strict';
import { test } from 'node:test';

import resolveRoleChange from '@/entities/notification/lib/resolveRoleChange';
import type { UserRole } from '@/shared/model/type';

// 런타임 enum을 import하면 shared/model/type의 SVG 에셋이 Node 테스트로 끌려온다
const NORMAL = 'NORMAL' as UserRole;
const CLUB_MASTER = 'CLUB_MASTER' as UserRole;
const CLUB_ADMIN = 'CLUB_ADMIN' as UserRole;
const GREEDY_ADMIN = 'GREEDY_ADMIN' as UserRole;

test('승격되면 세션 role을 갱신한다', () => {
  assert.deepEqual(resolveRoleChange(NORMAL, CLUB_MASTER), {
    shouldUpdate: true,
    role: CLUB_MASTER,
  });
});

test('강등되면 세션 role을 갱신한다', () => {
  assert.deepEqual(resolveRoleChange(CLUB_MASTER, NORMAL), {
    shouldUpdate: true,
    role: NORMAL,
  });
});

test('role이 null이면 세션을 건드리지 않는다', () => {
  // 관리자 토큰은 백엔드가 role을 조회하지 못해 null을 내려준다.
  [GREEDY_ADMIN, CLUB_ADMIN, NORMAL, undefined].forEach((currentRole) => {
    assert.deepEqual(resolveRoleChange(currentRole, null), {
      shouldUpdate: false,
    });
  });
});

test('관리자 세션은 일반 role로 덮어쓰지 않는다', () => {
  [GREEDY_ADMIN, CLUB_ADMIN].forEach((adminRole) => {
    assert.deepEqual(resolveRoleChange(adminRole, NORMAL), {
      shouldUpdate: false,
    });
    assert.deepEqual(resolveRoleChange(adminRole, CLUB_MASTER), {
      shouldUpdate: false,
    });
  });
});

test('role이 그대로면 갱신하지 않는다', () => {
  assert.deepEqual(resolveRoleChange(CLUB_MASTER, CLUB_MASTER), {
    shouldUpdate: false,
  });
});

test('세션에 role이 없다가 생기면 갱신한다', () => {
  assert.deepEqual(resolveRoleChange(undefined, CLUB_MASTER), {
    shouldUpdate: true,
    role: CLUB_MASTER,
  });
});
