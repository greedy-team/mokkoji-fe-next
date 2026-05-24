import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getSession } from '@/shared/lib/cookie-session';
import { UserRole } from '@/shared/model/type';
import AdminHeader from '@/shared/ui/AdminHeader';

export const metadata: Metadata = {
  title: '모꼬지 | 총동연 대시보드',
};

const ALLOWED_ROLES = [UserRole.GREEDY_ADMIN, UserRole.CLUB_ADMIN];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const role = session?.role;

  if (!role || !ALLOWED_ROLES.includes(role)) {
    redirect('/');
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <AdminHeader />
      <main className="mt-[85px] flex-1">{children}</main>
    </div>
  );
}
