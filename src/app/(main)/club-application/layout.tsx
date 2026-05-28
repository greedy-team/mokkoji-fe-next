import type { Metadata } from 'next';
import { type ReactNode } from 'react';

export const metadata: Metadata = {
  title: '모꼬지 | 동아리 신청',
  description: '세종대 동아리 신청 페이지',
  openGraph: {
    title: '모꼬지 | 동아리 신청',
    description: '세종대 동아리 신청 페이지',
    images: ['/mokkojiBanner.png'],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <main className="flex justify-center px-4 py-10">{children}</main>
    </div>
  );
}
