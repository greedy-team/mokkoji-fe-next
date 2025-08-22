'use client';

import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

function ClarityProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const id = process.env.NEXT_PUBLIC_CLARITY_ID;
    if (id && process.env.NEXT_PUBLIC_NODE_ENV === 'production') {
      Clarity.init(id);
    }
  }, []);
  return <div>{children}</div>;
}

export default ClarityProvider;
