import fs from 'fs';
import path from 'path';
import { test, expect } from '@playwright/test';

// Storybook build 결과물 경로
const indexPath = path.join(__dirname, '../storybook-static/index.json');
const data = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));

type StoryEntry = {
  id: string;
  title: string;
  name: string;
  importPath: string;
};

// docs 제외
const stories: StoryEntry[] = (
  Object.values(data.entries) as StoryEntry[]
).filter(
  (story) =>
    !story.id.includes('--docs') && !story.importPath.includes('/docs/'),
);

// eslint-disable-next-line no-restricted-syntax
for (const story of stories) {
  test(`${story.title}/${story.name} looks correct`, async ({ page }) => {
    await page.goto(`http://localhost:6006/iframe.html?id=${story.id}`);
    const root = page.locator('body');
    expect(await root.screenshot()).toMatchSnapshot(`${story.id}.png`);
  });
}
