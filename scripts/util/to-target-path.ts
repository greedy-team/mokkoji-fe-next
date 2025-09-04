import path from 'path';

function toTargetPath(relativePath: string) {
  if (relativePath === 'page')
    return path.join('src', 'app', '(main)', 'layout.tsx');
  const parts = relativePath
    .split('/')
    .map((p) => (/^\d+$/.test(p) ? '[id]' : p));
  return path.join('src', 'app', '(main)', ...parts, 'layout.tsx');
}
export default toTargetPath;
