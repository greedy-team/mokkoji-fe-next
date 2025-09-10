import fs from 'fs';
import path from 'path';

const APP_DIR = path.join(process.cwd(), 'src', 'app');

export default function toTargetPath(relativePath: string): string {
  if (relativePath === 'page') {
    // 1) 루트 page.tsx 있는지 확인
    const rootPage = path.join(APP_DIR, 'page.tsx');
    if (fs.existsSync(rootPage)) {
      return rootPage;
    }

    // 2) 그룹 폴더((xxx)) 안에서 page.tsx 탐색
    const groupDirs = fs
      .readdirSync(APP_DIR, { withFileTypes: true })
      .filter((d) => d.isDirectory() && /^\(.+\)$/.test(d.name));

    // eslint-disable-next-line no-restricted-syntax
    for (const gd of groupDirs) {
      const candidate = path.join(APP_DIR, gd.name, 'page.tsx');
      if (fs.existsSync(candidate)) {
        return candidate; // 첫 번째 발견된 그룹의 page.tsx 반환
      }
    }

    // 3) 못 찾으면 기본 fallback
    return rootPage;
  }

  // --- 원래 있던 나머지 로직 ---
  const parts = relativePath.split('/').filter(Boolean);
  let currentDir = APP_DIR;
  const resolvedParts: string[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const p of parts) {
    const targetPath = path.join(currentDir, p);

    // ✅ 그대로 있는 디렉토리
    if (fs.existsSync(targetPath) && fs.statSync(targetPath).isDirectory()) {
      resolvedParts.push(p);
      currentDir = targetPath;
      // eslint-disable-next-line no-continue
      continue;
    }

    // ✅ 그룹 폴더((xxx)) 확인
    const groupDirs = fs
      .readdirSync(currentDir, { withFileTypes: true })
      .filter((d) => d.isDirectory() && /^\(.+\)$/.test(d.name));

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
