import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test, { type TestContext } from 'node:test';

import {
  describeNotionTeamConfig,
  loadNotionTeamConfig,
  // Native Node ESM requires the .mjs extension for this standalone script.
  // eslint-disable-next-line import/extensions
} from '../../../scripts/NotionTeamConfig.mjs';

function fixture(t: TestContext, contents?: string) {
  const directory = mkdtempSync(join(tmpdir(), 'notion-team-'));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  const path = join(directory, '.env.notion');
  if (contents !== undefined) writeFileSync(path, contents);
  return path;
}

test('loads a quoted team token and optional default source from the env file', (t) => {
  const config = loadNotionTeamConfig(
    fixture(
      t,
      '\uFEFFNOTION_TOKEN="ntn_test_only" # comment\r\nNOTION_DEFAULT_PAGE_ID=abc\r\n',
    ),
  );
  assert.equal(config.token, 'ntn_test_only');
  assert.equal(config.pageId, 'abc');
});

test('requires the local team token even when another token is inherited', (t) => {
  const original = process.env.NOTION_TOKEN;
  process.env.NOTION_TOKEN = 'ntn_personal_test_only';
  t.after(() => {
    if (original === undefined) delete process.env.NOTION_TOKEN;
    else process.env.NOTION_TOKEN = original;
  });
  [undefined, '', 'NOTION_TOKEN="   "'].forEach((contents) => {
    assert.throws(
      () => loadNotionTeamConfig(fixture(t, contents)),
      /\.env\.notion.*NOTION_TOKEN/,
    );
  });
});

test('rejects conflicting page and database defaults', (t) => {
  assert.throws(
    () =>
      loadNotionTeamConfig(
        fixture(
          t,
          'NOTION_TOKEN=ntn_test_only\nNOTION_DEFAULT_PAGE_ID=abc\nNOTION_DEFAULT_DATABASE_ID=def',
        ),
      ),
    /one default/,
  );
});

test('status exposes only readiness and source IDs, never credentials or unrelated env values', (t) => {
  const config = loadNotionTeamConfig(
    fixture(
      t,
      'NOTION_TOKEN=ntn_test_only\nNOTION_DEFAULT_DATABASE_ID=def\nOTHER_SECRET=hidden',
    ),
  );
  assert.deepEqual(describeNotionTeamConfig(config), {
    server: 'notion-team',
    tokenConfigured: true,
    pageId: '',
    databaseId: 'def',
  });
});
