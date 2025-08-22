// scripts/insert-devtodo.ts
import fs from 'fs';
import path from 'path';

function toTargetPath(relativePath: string) {
  // 숫자는 [id]로 치환
  const parts = relativePath.split('/').map((p) => {
    if (/^\d+$/.test(p)) return '[id]';
    return p;
  });

  return path.join('src', 'app', '(main)', ...parts, 'layout.tsx');
}

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

  // import 추가
  if (!content.includes('DevTodo')) {
    const importRegex = /(import .*;)/;
    if (importRegex.test(content)) {
      content = content.replace(
        importRegex,
        "$1\nimport DevTodo from '@/shared/ui/dev-to-do';",
      );
    } else {
      content = `import DevTodo from '@/shared/ui/dev-to-do';\n${content}`;
    }
  }

  // JSX 생성
  const componentJSX = `
      <DevTodo
        id="${id}"
        name="${name}"
        ${description ? `description="${description}"` : ''}
        todos={[${todos.map((t: string) => `'${t}'`).join(', ')}]}
        x={${x || 30}}
        y={${y || 60}}
      />
`;

  if (content.includes('</main>')) {
    content = content.replace('</main>', `${componentJSX}\n    </main>`);
  } else {
    content += componentJSX;
  }

  fs.writeFileSync(absPath, content, 'utf-8');
  console.log('✅ DevTodo 삽입 완료:', absPath);
}

main();
