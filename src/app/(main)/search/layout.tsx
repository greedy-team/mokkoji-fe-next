import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '모꼬지 | 세종대 동아리 검색',
  description: '세종대 동아리 검색 페이지',
  openGraph: {
    title: '모꼬지 | 세종대 동아리 검색',
    description: '세종대 동아리 검색 페이지',
    url: 'https://mokkoji.site/search',
    images: ['/mokkojiBanner.png'],
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <main>{children}</main>;
}
