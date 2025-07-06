import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '모꼬지 | 세종대학교의 모든 동아리',
  description: '세종대학교 동아리 통합 플랫폼',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="p-25 pt-19">{children}</main>;
}
