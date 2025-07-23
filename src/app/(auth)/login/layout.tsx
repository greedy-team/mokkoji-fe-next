import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '모꼬지 | 로그인',
  description: '모꼬지 로그인',
};

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      {children}
    </div>
  );
}
