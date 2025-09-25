import { test } from '@playwright/test';

test('Safari 브라우저 열기', async ({ page }) => {
  await page.goto('/'); // baseURL에 설정된 3000으로 이동
  await page.pause(); // 🔥 여기서 멈추고 내가 직접 조작 가능
});
