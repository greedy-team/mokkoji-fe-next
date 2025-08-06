import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '모꼬지 | 마이페이지',
  description: '세종대학교 마이페이지',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="p-25 pt-11">{children}</main>;
}
