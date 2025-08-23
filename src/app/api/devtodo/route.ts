// app/api/devtodo/route.ts
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import { exec } from 'child_process';

// eslint-disable-next-line import/prefer-default-export
export async function POST(req: Request) {
  if (process.env.NEXT_PUBLIC_NODE_ENV === 'production') {
    console.log('production 환경 금지!');
    return Response.json({ success: false, message: 'production 환경 금지!' });
  }
  const body = await req.json();
  const id = randomUUID();

  const filePath = path.join(process.cwd(), 'scripts', 'devtodo-input.json');
  fs.writeFileSync(filePath, JSON.stringify({ id, ...body }, null, 2), 'utf-8');

  if (!body.relativePath) {
    console.error('❌ relativePath 없음');
  } else {
    exec(
      `npx tsx scripts/dev-to-do.ts ${body.relativePath}`,
      (err, stdout, stderr) => {
        if (err) {
          console.error('❌ insert-devtodo 실행 실패:', err);
        }
        console.log(stdout);
        console.error(stderr);
      },
    );
  }

  return Response.json({ success: true, id });
}
