import { test, expect } from '@playwright/test';

test('recruit page skeleton vs loaded', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // "모집 공고" 클릭 → recruit 페이지 이동
  await page
    .getByRole('navigation')
    .getByRole('link', { name: '모집 공고' })
    .click();

  // 스켈레톤이 보일 때 스냅샷
  await page.waitForSelector('[data-testid="skeleton"]'); // ← 스켈레톤에 testid 달아두면 편함
  expect(await page.screenshot()).toMatchSnapshot('recruit-skeleton.png');
  // 스켈레톤이 사라질 때까지 대기
  await page.waitForSelector('[data-testid="skeleton"]', { state: 'detached' });

  // 실제 컨텐츠가 보일 때 스냅샷
  await page.waitForSelector('[data-testid="recruit-card"]');
  expect(await page.screenshot()).toMatchSnapshot('recruit-loaded.png');
});
