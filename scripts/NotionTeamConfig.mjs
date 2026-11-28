import { readFileSync } from 'node:fs';
import { parseEnv } from 'node:util';

export function loadNotionTeamConfig(envPath) {
  let values;
  try {
    values = parseEnv(readFileSync(envPath, 'utf8').replace(/^\uFEFF/, ''));
  } catch {
    throw new Error('Cannot read .env.notion; configure NOTION_TOKEN locally.');
  }
  const token = values.NOTION_TOKEN?.trim();
  if (!token)
    throw new Error(
      'Set .env.notion NOTION_TOKEN to the team integration token.',
    );
  const pageId = values.NOTION_DEFAULT_PAGE_ID?.trim() ?? '';
  const databaseId = values.NOTION_DEFAULT_DATABASE_ID?.trim() ?? '';
  if (pageId && databaseId)
    throw new Error('Choose only one default: page or database.');
  return { token, pageId, databaseId };
}

export function describeNotionTeamConfig(config) {
  return {
    server: 'notion-team',
    tokenConfigured: Boolean(config.token),
    pageId: config.pageId,
    databaseId: config.databaseId,
  };
}
