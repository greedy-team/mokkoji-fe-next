'use client';

import { useEffect } from 'react';
import * as amplitude from '@amplitude/analytics-browser';

const AMPLITUDE_API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
const AMPLITUDE_ENABLED = process.env.NEXT_PUBLIC_AMPLITUDE_ENABLED === 'true';

function AmplitudeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!AMPLITUDE_ENABLED || !AMPLITUDE_API_KEY) return;
    amplitude.init(AMPLITUDE_API_KEY);
  }, []);

  return <div>{children}</div>;
}

export default AmplitudeProvider;
