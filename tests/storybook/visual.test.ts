import fs from 'fs';
import path from 'path';
import { test, expect } from '@playwright/test';

const indexPath = path.join(__dirname, '../storybook-static/index.json');

if (!fs.existsSync(indexPath)) {
  throw new Error(
    '스토리북 빌드 결과물이 없습니다. 먼저 pnpm build-storybook을 실행해주세요.',
  );
}

const data = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));

type StoryEntry = {
  id: string;
  title: string;
  name: string;
  importPath: string;
};

const stories: StoryEntry[] = (
  Object.values(data.entries) as StoryEntry[]
).filter(
  (story) =>
    !story.id.includes('--docs') && !story.importPath.includes('/docs/'),
);

stories.forEach((story) => {
  test(`${story.title}/${story.name} looks correct`, async ({ page }) => {
    await page.goto(`/iframe.html?id=${story.id}&viewMode=story`);
    await page.waitForLoadState('networkidle');
    const root = page.locator('#storybook-root');
    expect(await root.screenshot()).toMatchSnapshot(`${story.id}.png`);
  });
});
