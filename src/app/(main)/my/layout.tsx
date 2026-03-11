import HeaderMobile from '@/shared/ui/header-mobile';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '모꼬지 | 마이페이지',
  description: '모꼬지 마이페이지',
  openGraph: {
    title: '모꼬지 | 마이페이지',
    description: '모꼬지 마이페이지',
    url: 'https://mokkoji.site/my',
    images: ['/mokkojiBanner.png'],
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <HeaderMobile pageTitle="마이페이지" />
      <main className="flex flex-col justify-center px-2 pt-10 lg:items-center lg:px-0">
        {children}
      </main>
    </div>
  );
}
