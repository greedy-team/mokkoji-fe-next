import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '모꼬지 | 상세 페이지',
  description: '세종대학교 동아리 상세 페이지',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col items-center justify-center">
      {children}
    </main>
  );
}
