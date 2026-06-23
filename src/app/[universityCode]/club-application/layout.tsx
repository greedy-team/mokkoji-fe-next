import BottomNav from '@/shared/ui/bottom-nav';
import Header from '@/shared/ui/Header';
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

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ universityCode: string }>;
}) {
  const { universityCode } = await params;
  return (
    <div className="flex flex-col">
      <Header universityCode={universityCode} />
      <main className="flex px-4 py-7 pb-[calc(1.75rem+85px)] lg:pb-7">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
