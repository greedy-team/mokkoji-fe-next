import 'react-toastify/dist/ReactToastify.css';
import Header from '@/shared/ui/Header';
import Footer from '@/shared/ui/Footer';
import KakaoAdFit from '@/shared/ui/kakao-adfit';
import 'to-do-pin/index.css';
import type { Metadata } from 'next';
import BottomNav from '@/shared/ui/bottom-nav';
import QueryProvider from '@/shared/lib/QueryProvider';
import {
  getUniversityName,
  urlCodeToApiCode,
} from '@/shared/lib/universityMeta';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ universityCode: string }>;
}): Promise<Metadata> {
  const { universityCode } = await params;
  const universityName = getUniversityName(urlCodeToApiCode(universityCode));

  return {
    title: `모꼬지 | ${universityName} 동아리 모집 플랫폼`,
    description: `${universityName} 동아리 정보를 한곳에서 확인하세요. 최신 모집 공고, 행사 안내, 활동 소개까지 모꼬지와 함께 빠르게 찾아보세요.`,
    openGraph: {
      title: `모꼬지 – ${universityName} 동아리 모집 & 정보 플랫폼`,
      description: `${universityName} 동아리의 모집 공고, 활동 정보를 한 번에 확인할 수 있는 공식 캠퍼스 플랫폼입니다.`,
      url: `https://mokkoji.site/${universityCode}`,
      images: ['/mokkojiBanner.png'],
    },
  };
}

export default async function MainLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ universityCode: string }>;
}) {
  const { universityCode } = await params;

  const userQueryOptions = {
    queries: {
      staleTime: 10 * 60 * 1000,
      retry: 1,
    },
  };

  return (
    <QueryProvider defaultOptions={userQueryOptions}>
      <div className="flex h-screen w-full flex-col">
        <div className="hidden sm:block">
          <Header universityCode={universityCode} />
        </div>
        <main className="flex-1">{children}</main>
        <KakaoAdFit />
        <Footer />
        <BottomNav />
      </div>
    </QueryProvider>
  );
}
