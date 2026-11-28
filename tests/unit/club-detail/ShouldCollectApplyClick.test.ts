import assert from 'node:assert/strict';
import { test } from 'node:test';

import shouldCollectApplyClick from '@/entities/club-detail/util/shouldCollectApplyClick';

const OPEN_FORM = 'https://forms.gle/abc123';

test('모집 중이고 폼이 있으면 수집한다', () => {
  assert.equal(
    shouldCollectApplyClick({ recruitForm: OPEN_FORM, recruitStatus: 'OPEN' }),
    true,
  );
});

test('마감 임박도 모집 중이므로 수집한다', () => {
  assert.equal(
    shouldCollectApplyClick({
      recruitForm: OPEN_FORM,
      recruitStatus: 'IMMINENT',
    }),
    true,
  );
});

test('상시 모집도 수집한다', () => {
  assert.equal(
    shouldCollectApplyClick({
      recruitForm: OPEN_FORM,
      recruitStatus: 'ALWAYS',
    }),
    true,
  );
});

test('모집 시작 전에는 수집하지 않는다', () => {
  assert.equal(
    shouldCollectApplyClick({
      recruitForm: OPEN_FORM,
      recruitStatus: 'BEFORE',
    }),
    false,
  );
});

test('모집 마감 후에는 수집하지 않는다', () => {
  assert.equal(
    shouldCollectApplyClick({
      recruitForm: OPEN_FORM,
      recruitStatus: 'CLOSED',
    }),
    false,
  );
});

test('폼 링크가 없으면 수집하지 않는다', () => {
  assert.equal(
    shouldCollectApplyClick({ recruitForm: '', recruitStatus: 'OPEN' }),
    false,
  );
  assert.equal(
    shouldCollectApplyClick({ recruitForm: '   ', recruitStatus: 'OPEN' }),
    false,
  );
});
