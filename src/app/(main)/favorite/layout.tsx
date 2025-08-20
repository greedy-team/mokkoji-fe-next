import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '모꼬지 | 세종대 동아리 즐겨찾기',
  description: '세종대 동아리 즐겨찾기',
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
