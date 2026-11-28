import assert from 'node:assert/strict';
import { test } from 'node:test';

import stripHtmlTags from '@/shared/lib/stripHtmlTags';

test('empty editor content produces no preview text', () => {
  [undefined, '', '<p><br></p>', '<p>&nbsp;</p>'].forEach((input) => {
    assert.equal(stripHtmlTags(input), '');
  });
});

test('paragraphs and line breaks preserve word boundaries in previews', () => {
  assert.equal(
    stripHtmlTags('<p>Club introduction</p><p>Weekly<br>meeting</p>'),
    'Club introduction Weekly meeting',
  );
});

test('inline formatting preserves text and decodes supported entities', () => {
  assert.equal(
    stripHtmlTags('<strong>Music &amp; art</strong> &quot;club&quot;'),
    'Music & art "club"',
  );
});
