import type { Metadata } from 'next';
import QueryProvider from '@/shared/lib/QueryProvider';

export const metadata: Metadata = {
  title: '모꼬지 | 총동연 대시보드',
};

const adminQueryOptions = {
  queries: {
    staleTime: 0,
    retry: 1,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <QueryProvider defaultOptions={adminQueryOptions}>{children}</QueryProvider>
  );
}
