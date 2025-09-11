import path from 'path';
import { randomUUID } from 'crypto';
import { spawn } from 'child_process';

function runDevPin(command: string, payload: object) {
  return new Promise<string>((resolve, reject) => {
    const proc = spawn('node', [command], { stdio: ['pipe', 'pipe', 'pipe'] });

    proc.stdin.write(JSON.stringify(payload));
    proc.stdin.end();

    let stdout = '';
    let stderr = '';

    // eslint-disable-next-line no-return-assign
    proc.stdout.on('data', (data) => (stdout += data));
    // eslint-disable-next-line no-return-assign
    proc.stderr.on('data', (data) => (stderr += data));

    proc.on('close', (code) => {
      if (code !== 0) reject(new Error(stderr || `exit code ${code}`));
      else resolve(stdout.trim());
    });
  });
}

export async function POST(req: Request) {
  if (process.env.NEXT_PUBLIC_DEV_PIN_ENV === 'production') {
    return Response.json(
      { success: false, message: 'production 환경 금지!' },
      { status: 403 },
    );
  }

  const body = await req.json();
  const id = randomUUID();

  const cliPath = path.join(
    process.cwd(),
    'node_modules/next-dev-pin/dist/cli/dev-pin.js',
  );

  try {
    const output = await runDevPin(cliPath, { id, ...body });
    console.log(output);
    return Response.json({ success: true, id, output });
  } catch (err) {
    console.error('❌ dev-pin 실행 실패:', err);
    return Response.json(
      { success: false, message: (err as Error).message },
      { status: 500 },
    );
  }
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

  const cliPath = path.join(
    process.cwd(),
    'node_modules/next-dev-pin/dist/cli/remove-dev-pin.js',
  );

  try {
    const output = await runDevPin(cliPath, { id, relativePath });
    console.log(output);
    return Response.json({ success: true, id, output });
  } catch (err) {
    console.error('❌ remove-dev-pin 실행 실패:', err);
    return Response.json(
      { success: false, message: (err as Error).message },
      { status: 500 },
    );
  }
}
