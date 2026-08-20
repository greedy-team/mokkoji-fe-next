'use client';

import type { ReactNode } from 'react';

export default function DevToDoPin({ children }: { children: ReactNode }) {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line global-require
    const DevToDoPinContent = require('./DevToDoPinContent').default;

    return <DevToDoPinContent>{children}</DevToDoPinContent>;
  }

  return children;
}
