import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '모꼬지 | 세종대 동아리 즐겨찾기',
  description: '세종대 동아리 즐겨찾기',
  alternates: {
    canonical: 'https://mokkoji.site/favorite',
  },
  openGraph: {
    title: '모꼬지 | 세종대 동아리 즐겨찾기',
    description: '세종대 동아리 즐겨찾기',
    url: 'https://mokkoji.site/favorite',
    images: ['/mokkojiBanner.png'],
  },
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
