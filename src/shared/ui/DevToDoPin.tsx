'use client';

import type { ReactNode } from 'react';

export default function DevToDoPin({ children }: { children: ReactNode }) {
  // CSS는 정적 import여야 Turbopack이 모듈 팩토리를 만든다. 컴포넌트 본문에서 직접
  // require하면 dev가 깨지므로 정적 import는 Content 모듈에 두고, 그 모듈만 죽은
  // 분기에서 require해 프로덕션 번들에서 JS/CSS를 통째로 걷어낸다.
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line global-require
    const DevToDoPinContent = require('./DevToDoPinContent').default;

    return <DevToDoPinContent>{children}</DevToDoPinContent>;
  }

  return children;
}
