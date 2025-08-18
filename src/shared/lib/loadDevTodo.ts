// import fs from 'fs';
// import path from 'path';

// export type DevTodoData = {
//   id: string;
//   name: string;
//   description?: string;
//   x?: number;
//   y?: number;
//   todos: string[];
// };

// function loadDevTodo(routePath: string): DevTodoData | null {
//   const baseDir = path.join(process.cwd(), 'src/app', routePath);
//   const candidates = ['dev-todo.json', 'dev-todo.ts', 'dev-todo.md'];

//   for (const file of candidates) {
//     const fullPath = path.join(baseDir, file);
//     if (!fs.existsSync(fullPath)) continue;

//     if (file.endsWith('.json')) {
//       return JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
//     }

//     return null;
//   }

//   return null;
// }

// export default loadDevTodo;
