import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '모꼬지 | 세종대 동아리 등록',
  description: '세종대 동아리 등록',
  openGraph: {
    title: '모꼬지 | 세종대 동아리 등록',
    description: '세종대 동아리 모집 공고',
    images: ['/mokkojiBanner.png'],
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <main className="flex justify-center py-15">{children}</main>;
}
