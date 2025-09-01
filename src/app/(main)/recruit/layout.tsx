import type { Metadata } from 'next';

import DevTodo from '@/shared/ui/dev-to-do';

export const metadata: Metadata = {
  title: '모꼬지 | 세종대 동아리 모집 공고',
  description: '세종대 동아리 모집 공고',
  openGraph: {
    title: '모꼬지 | 세종대 동아리 모집 공고',
    description: '세종대 동아리 모집 공고',
    images: ['/mokkojiBanner.png'],
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col items-center justify-center px-4 pt-4 lg:w-[95vw]">
      {children}

      <DevTodo
        id="123d3a87-c36f-4ff9-92fe-fb0096b2b4f3"
        name="신혁수"
        description="ㄹㄴㄹ"
        todos={['ㄹㄴㄹㄴㄹ']}
        x={884}
        y={304}
      />

      <DevTodo
        id="542f37d0-9925-4cd7-8e46-d74b53ee42b8"
        name="정창우"
        description="헤더 관리자 페이지로 수정"
        todos={['헤더 수정']}
        x={1014}
        y={30}
      />
    </main>
  );
}
