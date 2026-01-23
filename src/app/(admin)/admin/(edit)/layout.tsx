import 'react-toastify/dist/ReactToastify.css';
import Footer from '@/shared/ui/Footer';
import 'to-do-pin/index.css';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { UserRole } from '@/shared/model/type';
import AdminHeader from '@/shared/ui/AdminHeader';

export const metadata: Metadata = {
  title: '모꼬지 | 세종대 동아리 모집 플랫폼',
  description:
    '세종대학교 동아리와 학생회 정보를 한곳에서 확인하세요. 최신 모집 공고, 행사 안내, 활동 소개까지 모꼬지와 함께 빠르게 찾아보세요.',
  openGraph: {
    title: '모꼬지 – 세종대 동아리·학생회 모집 & 정보 플랫폼',
    description:
      '세종대학교 동아리의 모집 공고, 행사 일정, 활동 정보를 한 번에 확인할 수 있는 공식 캠퍼스 플랫폼입니다.',
    url: 'https://mokkoji.site',
    images: ['/mokkojiBanner.png'],
  },
};

const ALLOWED_ROLES = [
  UserRole.GREEDY_ADMIN,
  UserRole.CLUB_ADMIN,
  UserRole.CLUB_MASTER,
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const role = session?.role;

  if (!role || !ALLOWED_ROLES.includes(role)) {
    redirect('/');
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed inset-0 -z-10 bg-black" />
      <AdminHeader />
      <main className="scrollbar-hide relative flex w-full flex-grow items-center justify-center pt-[100px] pb-[100px] text-white">
        {children}
      </main>
      <Footer />
    </div>
  );
}
