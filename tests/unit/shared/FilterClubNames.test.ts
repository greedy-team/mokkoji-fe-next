import assert from 'node:assert/strict';
import { test } from 'node:test';

import filterClubNames from '@/shared/lib/filterClubNames';

const toClubs = (names: string[]) =>
  names.map((name, index) => ({ id: index + 1, name }));

const namesOf = (clubs: { name: string }[]) => clubs.map(({ name }) => name);

test('choseong-only keyword matches club names by their initial consonants', () => {
  const clubs = toClubs(['모꼬지', '방송부', '모두의 코딩']);

  assert.deepEqual(namesOf(filterClubNames(clubs, 'ㅁㄲㅈ')), ['모꼬지']);
  assert.deepEqual(namesOf(filterClubNames(clubs, 'ㅁ')), [
    '모꼬지',
    '모두의 코딩',
  ]);
});

test('choseong-only keyword ignores final consonants', () => {
  const clubs = toClubs(['방송부']);

  assert.deepEqual(filterClubNames(clubs, 'ㅇ'), []);
});

test('keyword mixing syllables and jamo matches as a partial disassembled string', () => {
  const clubs = toClubs(['모꼬지', '방송부']);

  assert.deepEqual(namesOf(filterClubNames(clubs, '모ㄲ')), ['모꼬지']);
  assert.deepEqual(namesOf(filterClubNames(clubs, '꼬지')), ['모꼬지']);
  assert.deepEqual(namesOf(filterClubNames(clubs, '방소')), ['방송부']);
});

test('matching ignores letter case and whitespace', () => {
  const clubs = toClubs(['BAND 동아리', '모 꼬지']);

  assert.deepEqual(namesOf(filterClubNames(clubs, 'band')), ['BAND 동아리']);
  assert.deepEqual(namesOf(filterClubNames(clubs, ' ㅁ ㄲ ')), ['모 꼬지']);
  assert.deepEqual(namesOf(filterClubNames(clubs, '모꼬')), ['모 꼬지']);
});

test('blank keyword returns no clubs', () => {
  const clubs = toClubs(['모꼬지']);

  assert.deepEqual(filterClubNames(clubs, ''), []);
  assert.deepEqual(filterClubNames(clubs, '   '), []);
});

test('results are limited to ten clubs', () => {
  const clubs = toClubs(
    Array.from({ length: 12 }, (_, index) => `모임${index}`),
  );

  assert.equal(filterClubNames(clubs, 'ㅁㅇ').length, 10);
});
