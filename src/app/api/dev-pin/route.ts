// app/api/dev-to-do/route.ts
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import { exec } from 'child_process';

// POST → DevTodo 추가
export async function POST(req: Request) {
  if (process.env.NEXT_PUBLIC_DEV_PIN_ENV === 'production') {
    console.log('production 환경 금지!');
    return Response.json(
      { success: false, message: 'production 환경 금지!' },
      { status: 403 },
    );
  }

  const body = await req.json();
  const id = randomUUID();

  fs.writeFileSync(
    path.join(process.cwd(), 'scripts', 'dev-pin-input.json'),
    JSON.stringify({ id, ...body }, null, 2),
    'utf-8',
  );

  if (!body.relativePath) {
    console.error('❌ relativePath 없음');
  } else {
    exec(
      `npx tsx ${path.join(process.cwd(), 'scripts', 'dev-pin.ts')}`,
      (err, stdout, stderr) => {
        if (err) {
          console.error('❌ dev-pin 실행 실패:', err);
        }
        if (stdout) console.log(stdout);
        if (stderr) console.error(stderr);
      },
    );
  }

  return Response.json({ success: true, id });
}

// DELETE → DevTodo 삭제
export async function DELETE(req: Request) {
  if (process.env.NEXT_PUBLIC_DEV_PIN_ENV === 'production') {
    console.log('production 환경 금지!');
    return Response.json(
      { success: false, message: 'production 환경 금지!' },
      { status: 403 },
    );
  }

  const body = await req.json();
  const { id, relativePath } = body as { id?: string; relativePath?: string };

  if (!id || !relativePath) {
    console.error('❌ id 또는 relativePath 없음');
    return Response.json(
      { success: false, message: 'id와 relativePath가 필요합니다.' },
      { status: 400 },
    );
  }

  const filePath = path.join(process.cwd(), 'scripts', 'dev-delete.json');
  const payload = { id, relativePath };
  fs.writeFileSync(filePath, JSON.stringify(payload, null, 2), 'utf-8');

  exec(
    `npx tsx ${path.join(process.cwd(), 'scripts', 'remove-dev-pin.ts')}`,
    (err, stdout, stderr) => {
      if (err) {
        console.error('❌ remove-dev-pin 실행 실패:', err);
        return;
      }
      if (stdout) console.log(stdout.trim());
      if (stderr) console.error(stderr.trim());
    },
  );

  return Response.json({ success: true, file: filePath });
}
