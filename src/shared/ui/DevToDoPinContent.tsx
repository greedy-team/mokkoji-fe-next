'use client';

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
