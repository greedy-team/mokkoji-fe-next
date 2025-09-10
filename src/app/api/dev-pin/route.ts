// app/api/dev-pin/route.ts
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import { exec } from 'child_process';
import os from 'os';

// POST → DevPin 추가
export async function POST(req: Request) {
  if (process.env.NEXT_PUBLIC_DEV_PIN_ENV === 'production') {
    return Response.json(
      { success: false, message: 'production 환경 금지!' },
      { status: 403 },
    );
  }

  const body = await req.json();
  const id = randomUUID();

  // ✅ OS 임시 디렉토리 사용
  const tmpDir = path.join(os.tmpdir(), 'next-dev-pin');
  fs.mkdirSync(tmpDir, { recursive: true });

  const inputPath = path.join(tmpDir, `dev-pin-input-${id}.json`);
  fs.writeFileSync(
    inputPath,
    JSON.stringify({ id, ...body }, null, 2),
    'utf-8',
  );

  exec(
    `node ${path.join(process.cwd(), 'node_modules/next-dev-pin/dist/cli/dev-pin.js')} ${inputPath}`,
    (err, stdout, stderr) => {
      if (err) console.error('❌ dev-pin 실행 실패:', err);
      if (stdout) console.log(stdout);
      if (stderr) console.error(stderr);
    },
  );

  return Response.json({ success: true, id });
}

// DELETE → DevPin 삭제
export async function DELETE(req: Request) {
  if (process.env.NEXT_PUBLIC_DEV_PIN_ENV === 'production') {
    return Response.json(
      { success: false, message: 'production 환경 금지!' },
      { status: 403 },
    );
  }

  const body = await req.json();
  const { id, relativePath } = body as { id?: string; relativePath?: string };

  if (!id || !relativePath) {
    return Response.json(
      { success: false, message: 'id와 relativePath가 필요합니다.' },
      { status: 400 },
    );
  }

  // ✅ 임시 디렉토리 활용
  const tmpDir = path.join(os.tmpdir(), 'next-dev-pin');
  fs.mkdirSync(tmpDir, { recursive: true });

  const deletePath = path.join(tmpDir, `dev-delete-${id}.json`);
  fs.writeFileSync(
    deletePath,
    JSON.stringify({ id, relativePath }, null, 2),
    'utf-8',
  );

  exec(
    `node ${path.join(process.cwd(), 'node_modules/next-dev-pin/dist/cli/remove-dev-pin.js')} ${deletePath}`,
    (err, stdout, stderr) => {
      if (err) console.error('❌ remove-dev-pin 실행 실패:', err);
      if (stdout) console.log(stdout.trim());
      if (stderr) console.error(stderr.trim());
    },
  );

  return Response.json({ success: true, file: deletePath });
}
