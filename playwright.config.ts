import fs from 'fs';
import path from 'path';
import { defineConfig, devices } from '@playwright/test';

function loadEnvFile(filepath: string) {
  try {
    const content = fs.readFileSync(filepath, 'utf-8');
    content.split('\n').forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const eqIndex = trimmed.indexOf('=');
      if (eqIndex < 0) return;
      const key = trimmed.slice(0, eqIndex).trim();
      const value = trimmed
        .slice(eqIndex + 1)
        .trim()
        .replace(/^['"]|['"]$/g, '');
      if (key && !(key in process.env)) process.env[key] = value;
    });
  } catch (_error) {
    // .env.test.local 파일이 없으면 무시
  }
}

loadEnvFile(path.join(__dirname, '.env.test.local'));

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
      name: 'setup',
      testDir: './tests/e2e/setup',
      testMatch: /auth\.setup\.ts/,
      use: {
        baseURL: 'http://localhost:3000',
      },
    },

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
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:3000',
        storageState: 'playwright/.auth/user.json',
      },
    },
    {
      name: 'Firefox',
      testDir: './tests/e2e',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Firefox'],
        baseURL: 'http://localhost:3000',
        storageState: 'playwright/.auth/user.json',
      },
    },
    {
      name: 'WebKit',
      testDir: './tests/e2e',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Safari'],
        baseURL: 'http://localhost:3000',
        storageState: 'playwright/.auth/user.json',
      },
    },
  ],

  webServer: {
    command: 'pnpm dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
