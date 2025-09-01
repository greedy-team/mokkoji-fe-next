import fs from 'fs';
import path from 'path';
import formatWithPrettierAndEslint from './format';

const ROOT = process.cwd();
const APP_DIR = path.join(ROOT, 'src', 'app');
const TARGET_FILENAMES = new Set(['layout.tsx']);

function collectTargetFiles(dir: string, acc: string[] = []) {
  const ignore = new Set(['node_modules', '.next', '.git', 'dist', 'build']);
  fs.readdirSync(dir)
    .filter((name) => !ignore.has(name))
    .forEach((name) => {
      const p = path.join(dir, name);
      const stat = fs.statSync(p);
      if (stat.isDirectory()) collectTargetFiles(p, acc);
      else if (stat.isFile() && TARGET_FILENAMES.has(path.basename(p)))
        acc.push(p);
    });
  return acc;
}

function removeDevTodoTags(content: string) {
  const reSelfClosing = /^[\t ]*<DevTodo\b[^>]*?\/>\s*\r?\n?/gm;
  const reOpenClose = /^[\t ]*<DevTodo\b[^>]*?>[\s\S]*?<\/DevTodo>\s*\r?\n?/gm;
  return content.replace(reSelfClosing, '').replace(reOpenClose, '');
}

function removeDevTodoImportsIfUnused(content: string) {
  if (/<DevTodo\b/.test(content)) return content; // 아직 쓰이면 건드리지 않음

  // 정확 경로 import
  const reImportExact =
    /import\s+DevTodo\s+from\s+['"]@\/shared\/ui\/dev-to-do['"];?\s*\r?\n?/g;
  // 경로 무관 default import DevTodo (혹시 다른 경로로도 불러온 경우 대비)
  const reImportAnyDefault =
    /import\s+DevTodo(?:\s*,\s*\{[^}]*\})?\s+from\s+['"][^'"]+['"];?\s*\r?\n?/g;

  return content
    .replace(reImportExact, '')
    .replace(reImportAnyDefault, '')
    .replace(/\r?\n{3,}/g, '\n\n')
    .replace(/[ \t]+\r?\n/g, '\n');
}

async function main() {
  if (!fs.existsSync(APP_DIR)) {
    console.error('❌ src/app 폴더를 찾을 수 없습니다:', APP_DIR);
    process.exit(1);
  }

  const files = collectTargetFiles(APP_DIR);
  if (files.length === 0) {
    console.log('ℹ️ 대상 layout.tsx 파일이 없습니다.');
    return;
  }

  const results = await Promise.all(
    files.map(async (file) => {
      const before = fs.readFileSync(file, 'utf-8');

      let next = removeDevTodoTags(before);

      next = removeDevTodoImportsIfUnused(next);

      const isChanged = next !== before;
      if (isChanged) {
        const formatted = await formatWithPrettierAndEslint(file, next);
        fs.writeFileSync(file, formatted, 'utf-8');
        console.log('🧹 cleaned:', path.relative(ROOT, file));
      }
      return Number(isChanged);
    }),
  );

  const changed = results.reduce<number>((sum, v) => sum + v, 0);
  console.log(
    changed > 0
      ? `✅ DevTodo 정리 완료 (${changed} 파일 수정)`
      : '✨ 변경 사항 없음',
  );
}

if (process.env.NEXT_PUBLIC_NODE_ENV !== 'development') {
  main().catch((e) => {
    console.error('❌ 에러:', e);
    process.exit(1);
  });
}
