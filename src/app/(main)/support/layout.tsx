import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '모꼬지 | 세종대 동아리 고객센터',
  description: '세종대 동아리 고객센터',
  openGraph: {
    title: '모꼬지 | 세종대 동아리 고객센터',
    description: '세종대 동아리 고객센터',
    url: 'https://mokkoji.site/support',
    images: ['/mokkojiBanner.png'],
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="px-6 pt-11 lg:p-25">{children}</main>;
}
