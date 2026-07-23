import { test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('인증 세션 저장', async ({ request }) => {
  const studentId = process.env.TEST_STUDENT_ID;
  const password = process.env.TEST_PASSWORD;

  if (!studentId || !password) {
    throw new Error(
      '테스트 계정 정보가 없습니다. .env.test.local에 TEST_STUDENT_ID와 TEST_PASSWORD를 설정해주세요.',
    );
  }

  const response = await request.post('/api/auth/login', {
    data: { studentId, password },
  });

  if (!response.ok()) {
    const body = await response.json();
    throw new Error(`로그인 실패: ${body.message ?? response.status()}`);
  }

  await request.storageState({ path: authFile });
});
