'use client';

// to-do-pin은 개발 환경 전용이라 devDependencies에 있고, 이 모듈은 DevToDoPin의
// 죽은 분기에서만 require되므로 프로덕션 번들에 포함되지 않는다.
/* eslint-disable import/no-extraneous-dependencies */
import 'to-do-pin/index.css';
import { ToDoPinProvider } from 'to-do-pin';
/* eslint-enable import/no-extraneous-dependencies */
import type { ReactNode } from 'react';

export default function DevToDoPinContent({
  children,
}: {
  children: ReactNode;
}) {
  return <ToDoPinProvider>{children}</ToDoPinProvider>;
}
