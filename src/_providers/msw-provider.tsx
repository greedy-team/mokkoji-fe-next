'use client';

import { useEffect, useState } from 'react';
import { isMockingEnabled } from '@/mocks/config';

function MSWProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(!isMockingEnabled);

  useEffect(() => {
    // webpack은 조기 return 뒤의 도달 불가 코드에서도 import를 구문 단위로 수집한다.
    // 죽은 분기로 인식시켜 msw 청크를 걷어내려면 import가 이 블록 안에 있어야 하고,
    // 조건은 빌드 시 치환되는 env 표현식을 그대로 써야 한다.
    if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
      import('@/mocks/browser').then(({ startMockWorker }) => {
        startMockWorker().then(() => setIsReady(true));
      });
    }
  }, []);

  if (!isReady) return null;

  return children;
}

export default MSWProvider;
