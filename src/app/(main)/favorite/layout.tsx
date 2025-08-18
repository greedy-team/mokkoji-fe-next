import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '모꼬지 | 즐겨찾기',
  description: '세종대학교 동아리 즐겨찾기',
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
