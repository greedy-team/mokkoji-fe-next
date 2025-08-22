// // scripts/insert-devtodo.ts
// import fs from 'fs';
// import path from 'path';
// import readline from 'readline';
// import { randomUUID } from 'crypto';

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// function ask(question: string): Promise<string> {
//   return new Promise((resolve) => {
//     rl.question(question, (answer) => resolve(answer.trim()));
//   });
// }

// async function main() {
//   const relativePath = await ask(
//     '👉 (main) 이후 경로를 입력하세요 (예: club): ',
//   );

//   const id = randomUUID();

//   const name = await ask('👉 DevTodo name 값: ');
//   const description = await ask('👉 DevTodo description (옵션, 엔터시 생략): ');
//   const todos = await ask('👉 Todos (쉼표로 구분): ');
//   const x = await ask('👉 X 좌표 (기본 30): ');
//   const y = await ask('👉 Y 좌표 (기본 60): ');

//   rl.close();

//   const targetFile = path.join(
//     'src',
//     'app',
//     '(main)',
//     relativePath,
//     'layout.tsx',
//   );
//   const absPath = path.join(process.cwd(), targetFile);

//   if (!fs.existsSync(absPath)) {
//     console.error('❌ 대상 파일이 존재하지 않습니다:', absPath);
//     process.exit(1);
//   }

//   let content = fs.readFileSync(absPath, 'utf-8');

//   // 1) import 추가
//   if (!content.includes('DevTodo')) {
//     const importRegex = /(import .*;\s*\n)/;
//     if (importRegex.test(content)) {
//       content = content.replace(
//         importRegex,
//         `$1import DevTodo from '@/shared/ui/dev-to-do';\n`,
//       );
//     } else {
//       content = `import DevTodo from '@/shared/ui/dev-to-do';\n` + content;
//     }
//   }

//   // 2) JSX 생성
//   const componentJSX = `
//       <DevTodo
//         id='${id}'
//         name='${name}'
//         ${description ? `description='${description}'` : ''}
//         todos={[${todos
//           .split(',')
//           .map((t) => `"${t.trim()}"`)
//           .join(', ')}]}
//         x={${x || 30}}
//         y={${y || 60}}
//       />
// `;

//   if (content.includes('</main>')) {
//     content = content.replace('</main>', `${componentJSX}\n    </main>`);
//   } else {
//     console.warn('⚠️ </main> 태그를 찾지 못했습니다. 파일 끝에 추가합니다.');
//     content += componentJSX;
//   }

//   fs.writeFileSync(absPath, content, 'utf-8');
//   console.log('✅ DevTodo import + JSX 삽입 완료:', absPath);
// }

// main();
