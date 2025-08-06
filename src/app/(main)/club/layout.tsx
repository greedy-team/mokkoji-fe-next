import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '모꼬지 | 전체 동아리',
  description: '세종대학교 동아리 전체 목록',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col items-center justify-center pt-10">
      {children}
    </main>
  );
}
