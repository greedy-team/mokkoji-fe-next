// scripts/dev-delete.ts
import fs from 'fs';
import path from 'path';
import formatWithPrettierAndEslint from './format';
import toTargetPath from './util/to-target-path';

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function removeDevTodoBlocksById(content: string, todoId: string) {
  const idEsc = escapeRegExp(todoId);

  // ✅ 조건부 + self-closing
  const reConditionalSelfClosing = new RegExp(
    String.raw`{process\.env\.NEXT_PUBLIC_NODE_ENV\s*===\s*['"]development['"]\s*&&\s*\(\s*<DevTodo\b[^>]*\bid\s*=\s*["'\`]${idEsc}["'\`][^>]*?\/>\s*\)}\s*`,
    'gm',
  );

  // ✅ 조건부 + paired
  const reConditionalPaired = new RegExp(
    String.raw`{process\.env\.NEXT_PUBLIC_NODE_ENV\s*===\s*['"]development['"]\s*&&\s*\(\s*<DevTodo\b[^>]*\bid\s*=\s*["'\`]${idEsc}["'\`][\s\S]*?<\/DevTodo>\s*\)}\s*`,
    'gm',
  );

  // ✅ 혹시 조건부 wrapper 없이 바로 <DevTodo .../> 가 삽입된 경우도 방어
  const reSelfClosing = new RegExp(
    String.raw`<DevTodo\b[^>]*\bid\s*=\s*["'\`]${idEsc}["'\`][^>]*?\/>\s*`,
    'gm',
  );
  const rePaired = new RegExp(
    String.raw`<DevTodo\b[^>]*\bid\s*=\s*["'\`]${idEsc}["'\`][\s\S]*?<\/DevTodo>\s*`,
    'gm',
  );

  const next = content
    .replace(reConditionalSelfClosing, '')
    .replace(reConditionalPaired, '')
    .replace(reSelfClosing, '')
    .replace(rePaired, '');

  // 여분 공백 정리
  return next.replace(/\r?\n{3,}/g, '\n\n').replace(/[ \t]+\r?\n/g, '\n');
}

function removeImportIfUnused(content: string) {
  // 남아 있는 <DevTodo> 사용이 있으면 import 유지
  if (/<DevTodo\b/.test(content)) return content;

  // 정확 경로 import
  const reImportExact =
    /import\s+DevTodo\s+from\s+['"]@\/shared\/ui\/dev-to-do['"];?\s*\r?\n?/g;
  // 다른 경로로 불러왔을 경우도 제거
  const reImportAnyDefault =
    /import\s+DevTodo(?:\s*,\s*\{[^}]*\})?\s+from\s+['"][^'"]+['"];?\s*\r?\n?/g;

  const next = content
    .replace(reImportExact, '')
    .replace(reImportAnyDefault, '');

  return next.replace(/\r?\n{3,}/g, '\n\n');
}

async function main() {
  const inputPath = path.join(process.cwd(), 'scripts', 'dev-delete.json');
  if (!fs.existsSync(inputPath)) {
    console.error('❌ dev-delete.json 없음');
    process.exit(1);
  }

  const { id, relativePath } = JSON.parse(
    fs.readFileSync(inputPath, 'utf-8'),
  ) as {
    id: string;
    relativePath: string;
  };

  if (!id || !relativePath) {
    console.error('❌ 입력값 부족: id, relativePath가 필요합니다.');
    process.exit(1);
  }

  const targetFile = toTargetPath(relativePath);

  if (!fs.existsSync(targetFile)) {
    console.error('❌ 대상 파일 없음:', targetFile);
    process.exit(1);
  }

  let content = fs.readFileSync(targetFile, 'utf-8');

  // 1) 해당 id의 DevTodo 블록 제거
  const afterRemoval = removeDevTodoBlocksById(content, id);
  if (afterRemoval === content) {
    console.warn('⚠️ 삭제 대상 <DevTodo id="%s" /> 를 찾지 못했습니다.', id);
  }
  content = afterRemoval;

  // 2) import 정리
  content = removeImportIfUnused(content);

  // 3) Prettier → ESLint --fix
  const final = await formatWithPrettierAndEslint(targetFile, content);
  fs.writeFileSync(targetFile, final, 'utf-8');

  console.log('✅ DevTodo 제거 + Prettier + ESLint --fix 완료:', targetFile);
}

main().catch((e) => {
  console.error('❌ 에러:', e);
  process.exit(1);
});
