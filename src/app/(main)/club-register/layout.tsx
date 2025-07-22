import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '모꼬지 | 모집 공고',
  description: '세종대학교 동아리 모집 공고',
};

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <main className="p-25 pt-11">{children}</main>;
}
