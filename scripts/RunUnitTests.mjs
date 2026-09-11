import { spawnSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const testRoot = path.join(projectRoot, 'tests/unit');

function collectTests(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return collectTests(entryPath);
    return entry.isFile() && /\.test\.(?:cjs|mjs|js|ts)$/.test(entry.name)
      ? [entryPath]
      : [];
  });
}

const tests = collectTests(testRoot).sort();
if (tests.length === 0) {
  console.error('No unit test files found in tests/unit.');
  process.exit(1);
}

console.log(`Running ${tests.length} unit test file(s).`);
const result = spawnSync(
  process.execPath,
  ['--import', 'tsx', '--test', ...process.argv.slice(2), ...tests],
  { cwd: projectRoot, stdio: 'inherit' },
);
if (result.error) console.error(result.error.message);
process.exit(result.status ?? 1);
