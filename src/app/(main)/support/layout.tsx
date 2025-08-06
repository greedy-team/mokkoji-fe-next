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
  return <main className="p-25 pt-11">{children}</main>;
}
