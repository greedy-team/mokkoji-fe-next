import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '모꼬지 | 고객센터',
  description: '세종대학교 동아리 고객센터',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="px-4 py-6 sm:px-6 lg:px-8 xl:px-12">{children}</main>;
}
