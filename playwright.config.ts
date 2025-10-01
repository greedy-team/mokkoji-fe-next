import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  snapshotDir: './tests/__snapshots__',
  expect: {
    toMatchSnapshot: {
      threshold: 0.2,
    },
  },
  use: {
    headless: false,
    launchOptions: {
      args: ['--disable-cache'],
    },
  },

  projects: [
    {
      name: 'Storybook-Chromium',
      testDir: './tests/storybook',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:6006',
      },
    },
    {
      name: 'Chromium',
      testDir: './tests/e2e',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:3000',
      },
    },
    {
      name: 'Firefox',
      testDir: './tests/e2e',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: 'http://localhost:3000',
      },
    },
    {
      name: 'WebKit',
      testDir: './tests/e2e',
      use: {
        ...devices['Desktop Safari'],
        baseURL: 'http://localhost:3000',
      },
    },
  ],

  // ✅ Next.js dev 서버 자동 실행 (E2E 전용)
  webServer: {
    command: 'pnpm dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
