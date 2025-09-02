// scripts/insert-devtodo.ts
import fs from 'fs';
import path from 'path';
import formatWithPrettierAndEslint from './format';
import toTargetPath from './util/to-target-path';

async function main() {
  const inputPath = path.join(process.cwd(), 'scripts', 'devtodo-input.json');
  if (!fs.existsSync(inputPath)) {
    console.error('❌ devtodo-input.json 없음');
    process.exit(1);
  }

  const { id, name, description, todos, x, y, relativePath } = JSON.parse(
    fs.readFileSync(inputPath, 'utf-8'),
  );

  const targetFile = toTargetPath(relativePath);
  const absPath = path.join(process.cwd(), targetFile);

  if (!fs.existsSync(absPath)) {
    console.error('❌ 대상 파일 없음:', absPath);
    process.exit(1);
  }

  let content = fs.readFileSync(absPath, 'utf-8');

  // import 추가 (이미 import돼 있지 않은 경우에만)
  const hasImport =
    /import\s+DevTodo\s+from\s+['"]@\/shared\/ui\/dev-to-do['"]/.test(content);
  if (!hasImport) {
    const importBlockRegex = /(^\s*import[\s\S]*?;\s*\n)/m; // 첫 import 블록 뒤에 삽입
    if (importBlockRegex.test(content)) {
      content = content.replace(
        importBlockRegex,
        "$1import DevTodo from '@/shared/ui/dev-to-do';\n",
      );
    } else {
      content = `import DevTodo from '@/shared/ui/dev-to-do';\n\n${content}`;
    }
  }

  let componentJSX;
  if (relativePath === 'page') {
    componentJSX = `
    <DevTodo
      id="${id}"
      name="${name}"
      ${description ? `description="${description}"` : ''}
      todos={[${(todos as string[]).map((t) => `'${t}'`).join(', ')}]}
      x={${x || 30}}
      y={${y || 60}}
      root
    />
`;
  } else {
    componentJSX = `
      <DevTodo
        id="${id}"
        name="${name}"
        ${description ? `description="${description}"` : ''}
        todos={[${(todos as string[]).map((t) => `'${t}'`).join(', ')}]}
        x={${x || 30}}
        y={${y || 60}}
      />
`;
  }

  if (content.includes('</main>')) {
    content = content.replace('</main>', `${componentJSX}    </main>`);
  } else {
    content += componentJSX;
  }

  // ✅ Prettier → ESLint --fix → (실패 시) fallback
  const final = await formatWithPrettierAndEslint(absPath, content);
  fs.writeFileSync(absPath, final, 'utf-8');

  console.log('✅ DevTodo 삽입 + Prettier + ESLint --fix 완료:', absPath);
}

main().catch((e) => {
  console.error('❌ 에러:', e);
  process.exit(1);
});
