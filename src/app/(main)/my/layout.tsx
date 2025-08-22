import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '모꼬지 | 마이페이지',
  description: '모꼬지 마이페이지',
  openGraph: {
    title: '모꼬지 | 마이페이지',
    description: '모꼬지 마이페이지',
    images: ['/mokkojiBanner.png'],
  },
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
