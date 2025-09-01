import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

// eslint-disable-next-line import/prefer-default-export
export async function POST(req: Request) {
  if (process.env.NEXT_PUBLIC_NODE_ENV === 'production') {
    console.log('production 환경 금지!');
    return Response.json(
      { success: false, message: 'production 환경 금지!' },
      { status: 403 },
    );
  }

  // body: { id: string; relativePath: string; run?: boolean }
  const body = await req.json();
  const { id, relativePath } = body as {
    id?: string;
    relativePath?: string;
  };

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

  exec('npx tsx scripts/remove-devtodo.ts', (err, stdout, stderr) => {
    if (err) {
      console.error('❌ remove-devtodo 실행 실패:', err);
      return;
    }
    if (stdout) console.log(stdout.trim());
    if (stderr) console.error(stderr.trim());
  });

  return Response.json({ success: true, file: filePath });
}
