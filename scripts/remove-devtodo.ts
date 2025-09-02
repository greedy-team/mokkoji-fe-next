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

  // 1) self-closing: <DevTodo ... id="..." ... />
  const selfClosing = new RegExp(
    String.raw`^[\t ]*<DevTodo\b[^>]*\bid\s*=\s*["'\`]${idEsc}["'\`][\s\S]*?\/>\s*\r?\n?`,
    'gm',
  );

  // 2) paired: <DevTodo ... id="..."> ... </DevTodo>
  const paired = new RegExp(
    String.raw`^[\t ]*<DevTodo\b[^>]*\bid\s*=\s*["'\`]${idEsc}["'\`][\s\S]*?<\/DevTodo>\s*\r?\n?`,
    'gm',
  );

  let next = content.replace(selfClosing, '');
  next = next.replace(paired, '');

  // 여분 공백 정리
  return next.replace(/\r?\n{3,}/g, '\n\n').replace(/[ \t]+\r?\n/g, '\n');
}

function removeImportIfUnused(content: string) {
  // 남은 사용이 있으면 그대로 둠
  if (/<DevTodo\b/.test(content)) return content;

  // 정확 경로
  const reImportExact =
    /import\s+DevTodo\s+from\s+['"]@\/shared\/ui\/dev-to-do['"];?\s*\r?\n?/g;
  // 경로 무관 default import DevTodo (선택 제거)
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
  const absPath = path.join(process.cwd(), targetFile);

  if (!fs.existsSync(absPath)) {
    console.error('❌ 대상 파일 없음:', absPath);
    process.exit(1);
  }

  let content = fs.readFileSync(absPath, 'utf-8');

  // 1) 해당 id의 DevTodo 블록들 제거
  const afterRemoval = removeDevTodoBlocksById(content, id);
  if (afterRemoval === content) {
    console.warn('⚠️ 삭제 대상 <DevTodo id="%s" /> 를 찾지 못했습니다.', id);
  }
  content = afterRemoval;

  // 2) 남은 사용 없으면 import 제거
  content = removeImportIfUnused(content);

  // 3) Prettier → ESLint --fix (fallback 포함)
  const final = await formatWithPrettierAndEslint(absPath, content);
  fs.writeFileSync(absPath, final, 'utf-8');

  console.log('✅ DevTodo 제거 + Prettier + ESLint --fix 완료:', absPath);
}

main().catch((e) => {
  console.error('❌ 에러:', e);
  process.exit(1);
});
