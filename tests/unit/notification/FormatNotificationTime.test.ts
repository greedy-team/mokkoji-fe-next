import assert from 'node:assert/strict';
import { test } from 'node:test';

import formatNotificationTime from '@/entities/notification/lib/formatNotificationTime';

// 백엔드 LocalDateTime은 타임존이 없다. 로컬 시각으로 읽히는지 확인하기 위해
// 기준 시각도 같은 방식으로 만든다.
const localIso = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate(),
  ).padStart(2, '0')}T${String(date.getHours()).padStart(2, '0')}:${String(
    date.getMinutes(),
  ).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;

const ago = (milliseconds: number, now: number) =>
  formatNotificationTime(localIso(new Date(now - milliseconds)), now);

const NOW = new Date('2026-11-25T15:00:00').getTime();

test('1분 미만은 방금 전', () => {
  assert.equal(ago(5 * 1000, NOW), '방금 전');
});

test('분 단위', () => {
  assert.equal(ago(3 * 60 * 1000, NOW), '3분 전');
  assert.equal(ago(59 * 60 * 1000, NOW), '59분 전');
});

test('시간 단위', () => {
  assert.equal(ago(60 * 60 * 1000, NOW), '1시간 전');
  assert.equal(ago(5 * 60 * 60 * 1000, NOW), '5시간 전');
});

test('하루 전은 어제', () => {
  assert.equal(ago(25 * 60 * 60 * 1000, NOW), '어제');
});

test('일 단위', () => {
  assert.equal(ago(3 * 24 * 60 * 60 * 1000, NOW), '3일 전');
});

test('일주일이 넘으면 날짜로 표시한다', () => {
  assert.equal(ago(10 * 24 * 60 * 60 * 1000, NOW), '2026. 11. 15.');
});

test('타임존이 붙은 값도 그대로 해석한다', () => {
  const now = new Date('2026-11-25T15:00:00Z').getTime();
  assert.equal(formatNotificationTime('2026-11-25T14:00:00Z', now), '1시간 전');
});

test('깨진 값은 빈 문자열', () => {
  assert.equal(formatNotificationTime('not-a-date'), '');
});
