import assert from 'node:assert/strict';
import { test } from 'node:test';

import isApplyFormLink from '@/entities/club-detail/util/isApplyFormLink';

test('동일한 주소는 지원 폼 링크로 판정한다', () => {
  assert.equal(
    isApplyFormLink('https://forms.gle/abc123', 'https://forms.gle/abc123'),
    true,
  );
});

test('끝 슬래시 차이는 같은 주소로 본다', () => {
  assert.equal(
    isApplyFormLink('https://forms.gle/abc123/', 'https://forms.gle/abc123'),
    true,
  );
  assert.equal(
    isApplyFormLink('https://forms.gle/abc123', 'https://forms.gle/abc123/'),
    true,
  );
});

test('공유 쿼리 파라미터가 붙어도 같은 주소로 본다', () => {
  assert.equal(
    isApplyFormLink(
      'https://docs.google.com/forms/d/e/1FAI/viewform?usp=sharing',
      'https://docs.google.com/forms/d/e/1FAI/viewform',
    ),
    true,
  );
});

test('추적 파라미터가 붙어도 같은 주소로 본다', () => {
  assert.equal(
    isApplyFormLink(
      'https://forms.gle/abc123?fbclid=IwAR0&utm_source=instagram',
      'https://forms.gle/abc123',
    ),
    true,
  );
});

test('쿼리로 폼을 구분하는 주소는 식별자가 다르면 판정하지 않는다', () => {
  assert.equal(
    isApplyFormLink(
      'https://forms.office.com/Pages/ResponsePage.aspx?id=BBBB',
      'https://forms.office.com/Pages/ResponsePage.aspx?id=AAAA',
    ),
    false,
  );
});

test('쿼리로 폼을 구분하는 주소는 식별자가 같으면 판정한다', () => {
  assert.equal(
    isApplyFormLink(
      'https://forms.office.com/Pages/ResponsePage.aspx?id=AAAA&utm_medium=story',
      'https://forms.office.com/Pages/ResponsePage.aspx?id=AAAA',
    ),
    true,
  );
});

test('쿼리 순서가 달라도 같은 주소로 본다', () => {
  assert.equal(
    isApplyFormLink(
      'https://forms.office.com/r/abc?page=2&id=AAAA',
      'https://forms.office.com/r/abc?id=AAAA&page=2',
    ),
    true,
  );
});

test('프로토콜 차이는 같은 주소로 본다', () => {
  assert.equal(
    isApplyFormLink('http://forms.gle/abc123', 'https://forms.gle/abc123'),
    true,
  );
});

test('호스트 대소문자와 www 차이는 같은 주소로 본다', () => {
  assert.equal(
    isApplyFormLink('https://WWW.Forms.GLE/abc123', 'https://forms.gle/abc123'),
    true,
  );
});

test('본문의 다른 링크는 지원 폼으로 판정하지 않는다', () => {
  const recruitForm = 'https://forms.gle/abc123';

  assert.equal(
    isApplyFormLink('https://instagram.com/greedy_sejong', recruitForm),
    false,
  );
  assert.equal(
    isApplyFormLink('https://open.kakao.com/o/xyz', recruitForm),
    false,
  );
});

test('같은 호스트라도 경로가 다르면 지원 폼으로 판정하지 않는다', () => {
  assert.equal(
    isApplyFormLink('https://forms.gle/different', 'https://forms.gle/abc123'),
    false,
  );
});

test('지원 폼이 비어 있으면 어떤 링크도 판정하지 않는다', () => {
  assert.equal(isApplyFormLink('https://forms.gle/abc123', ''), false);
  assert.equal(isApplyFormLink('https://forms.gle/abc123', '   '), false);
});

test('링크가 비어 있으면 판정하지 않는다', () => {
  assert.equal(isApplyFormLink('', 'https://forms.gle/abc123'), false);
});

test('주소 형식이 아니면 판정하지 않는다', () => {
  assert.equal(isApplyFormLink('지원하기', 'https://forms.gle/abc123'), false);
  assert.equal(
    isApplyFormLink('https://forms.gle/abc123', '폼 링크 없음'),
    false,
  );
});
