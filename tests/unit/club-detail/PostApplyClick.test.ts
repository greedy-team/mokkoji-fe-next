import assert from 'node:assert/strict';
import { test } from 'node:test';

import postApplyClick from '@/features/club-detail/api/postApplyClick';

test('수집 요청이 실패해도 예외를 던지지 않는다', async () => {
  const failingSend = () => Promise.reject(new Error('network down'));

  await assert.doesNotReject(() => postApplyClick(1, failingSend));
});

test('수집 요청이 거부되어도 호출자에게 결과를 돌려준다', async () => {
  const failingSend = () => Promise.reject(new Error('500'));

  assert.equal(await postApplyClick(1, failingSend), false);
});

test('수집에 성공하면 참을 돌려준다', async () => {
  const succeedingSend = () => Promise.resolve();

  assert.equal(await postApplyClick(1, succeedingSend), true);
});

test('모집글 번호를 경로에 담아 보낸다', async () => {
  const calledPaths: string[] = [];
  const recordingSend = (path: string) => {
    calledPaths.push(path);
    return Promise.resolve();
  };

  await postApplyClick(42, recordingSend);

  assert.deepEqual(calledPaths, ['recruitments/42/apply-click']);
});

test('모집글 번호가 없으면 요청을 보내지 않는다', async () => {
  let sendCount = 0;
  const countingSend = () => {
    sendCount += 1;
    return Promise.resolve();
  };

  assert.equal(await postApplyClick(undefined, countingSend), false);
  assert.equal(sendCount, 0);
});
