import prettier from 'prettier';
import { ESLint } from 'eslint';

// import 블록 뒤에 빈 줄이 없으면 추가 (ESLint 실패 대비용)
function ensureBlankLineAfterImports(code: string) {
  return code.replace(
    /((?:^|\n)(?:import[\s\S]*?from\s+['"][^'"]+['"];?\s*\n)+)(?!\n)/,
    '$1\n',
  );
}

async function formatWithPrettierAndEslint(filePath: string, code: string) {
  let out = code;

  // 1) Prettier
  try {
    const config = (await prettier.resolveConfig(filePath)) ?? {};
    out = await prettier.format(out, { ...config, filepath: filePath });
  } catch (e) {
    console.warn('⚠️ Prettier 포맷 실패, 그대로 진행합니다:', e);
  }

  // 2) ESLint --fix (newline-after-import 등 규칙 적용)
  try {
    const eslint = new ESLint({ fix: true });
    const results = await eslint.lintText(out, { filePath }); // filePath 중요!
    out = results[0]?.output ?? out;
  } catch (e) {
    console.warn('⚠️ ESLint --fix 실패, fallback 적용합니다:', e);
    out = ensureBlankLineAfterImports(out);
  }

  return out;
}
export default formatWithPrettierAndEslint;
