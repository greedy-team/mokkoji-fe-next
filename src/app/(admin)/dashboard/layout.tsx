import type { Metadata } from 'next';
import DashboardHeader from '@/shared/ui/DashboardHeader';

export const metadata: Metadata = {
  title: '모꼬지 | 총동연 대시보드',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <DashboardHeader />
      <main className="mt-[85px] flex-1">{children}</main>
    </div>
  );
}
