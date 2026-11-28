import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import {
  describeNotionTeamConfig,
  loadNotionTeamConfig,
} from './NotionTeamConfig.mjs';

try {
  const config = loadNotionTeamConfig(
    new URL('../.env.notion', import.meta.url),
  );
  if (process.argv.includes('--check')) {
    // Local configuration only; this does not verify API credentials or page access.
    console.log(JSON.stringify(describeNotionTeamConfig(config)));
  } else {
    const env = { ...process.env, NOTION_TOKEN: config.token };
    // This alternate authentication header must not override the team token.
    delete env.OPENAPI_MCP_HEADERS;
    const windows = process.platform === 'win32';
    const child = spawn(
      windows ? 'cmd.exe' : 'npx',
      windows
        ? ['/d', '/s', '/c', 'npx.cmd --yes @notionhq/notion-mcp-server@2.5.1']
        : ['--yes', '@notionhq/notion-mcp-server@2.5.1'],
      {
        cwd: fileURLToPath(new URL('..', import.meta.url)),
        env,
        stdio: 'inherit',
        windowsHide: true,
      },
    );
    child.on('error', () => {
      console.error(
        'Could not start notion-team MCP. Check Node/npm installation and registry access.',
      );
      process.exitCode = 1;
    });
    child.on('exit', (code) => {
      process.exitCode = code ?? 1;
    });
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
