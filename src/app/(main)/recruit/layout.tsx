import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '모꼬지 | 세종대 동아리 모집 공고',
  description: '세종대 동아리 모집 공고',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col items-center justify-center pt-4 lg:pt-10">
      {children}
    </main>
  );
}
