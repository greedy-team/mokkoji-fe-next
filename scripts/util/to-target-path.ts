import fs from 'fs';
import path from 'path';

const APP_DIR = path.join(process.cwd(), 'src', 'app');

export default function toTargetPath(relativePath: string): string {
  if (relativePath === 'page') {
    return path.join(APP_DIR, '(main)', 'page.tsx'); // 기본값을 (main) 포함
  }

  const parts = relativePath.split('/').filter(Boolean);
  let currentDir = APP_DIR;
  const resolvedParts: string[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const p of parts) {
    const targetPath = path.join(currentDir, p);

    // ✅ 먼저 그대로 있는지 확인
    if (fs.existsSync(targetPath) && fs.statSync(targetPath).isDirectory()) {
      resolvedParts.push(p);
      currentDir = targetPath;
      // eslint-disable-next-line no-continue
      continue;
    }

    // ✅ 그룹 폴더((xxx)) 안에 있는지 확인
    const groupDirs = fs
      .readdirSync(currentDir, { withFileTypes: true })
      .filter((d) => d.isDirectory() && /^\(.+\)$/.test(d.name)); // (main), (auth) 등
    // eslint-disable-next-line @typescript-eslint/no-loop-func
    const foundInGroup = groupDirs.find((gd) =>
      fs.existsSync(path.join(currentDir, gd.name, p)),
    );

    if (foundInGroup) {
      resolvedParts.push(foundInGroup.name, p);
      currentDir = path.join(currentDir, foundInGroup.name, p);
      // eslint-disable-next-line no-continue
      continue;
    }

    // ✅ 숫자 → 동적 세그먼트 매핑
    if (/^\d+$/.test(p)) {
      const dirs = fs.readdirSync(currentDir, { withFileTypes: true });
      const dynamic = dirs.find(
        (d) => d.isDirectory() && /^\[.+\]$/.test(d.name),
      );
      if (dynamic) {
        resolvedParts.push(dynamic.name);
        currentDir = path.join(currentDir, dynamic.name);
        // eslint-disable-next-line no-continue
        continue;
      }
    }

    // fallback
    resolvedParts.push(p);
    currentDir = targetPath;
  }

  return path.join(APP_DIR, ...resolvedParts, 'page.tsx');
}
