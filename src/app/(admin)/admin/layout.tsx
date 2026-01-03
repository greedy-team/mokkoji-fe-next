import 'react-toastify/dist/ReactToastify.css';
import Footer from '@/shared/ui/Footer';
import 'to-do-pin/index.css';
import type { Metadata } from 'next';
import AdminHeader from '@/shared/ui/AdminHeader';

export const metadata: Metadata = {
  title: '모꼬지 | 세종대 동아리·학생회 모집 플랫폼',
  description:
    '세종대학교 동아리와 학생회 정보를 한곳에서 확인하세요. 최신 모집 공고, 행사 안내, 활동 소개까지 모꼬지와 함께 빠르게 찾아보세요.',
  openGraph: {
    title: '모꼬지 – 세종대 동아리·학생회 모집 & 정보 플랫폼',
    description:
      '세종대학교 동아리와 학생회 모집 공고, 행사 일정, 활동 정보를 한 번에 확인할 수 있는 공식 캠퍼스 플랫폼입니다.',
    url: 'https://mokkoji.site',
    images: ['/mokkojiBanner.png'],
  },
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <AdminHeader />
      <main className="flex w-full flex-grow items-center justify-center px-[25%] pt-[60px]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
