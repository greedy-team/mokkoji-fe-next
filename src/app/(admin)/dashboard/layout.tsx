import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '모꼬지 | 총동연 대시보드',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return children;
}
