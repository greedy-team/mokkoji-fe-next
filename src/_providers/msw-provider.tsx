'use client';

import { useEffect, useState } from 'react';
import { isMockingEnabled } from '@/mocks/config';

function MSWProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(!isMockingEnabled);

  useEffect(() => {
    if (!isMockingEnabled) return;
    import('@/mocks/browser').then(({ startMockWorker }) => {
      startMockWorker().then(() => setIsReady(true));
    });
  }, []);

  if (!isReady) return null;

  return children;
}

export default MSWProvider;
