import type { Metadata } from 'next';
import DevTodo from '@/shared/ui/dev-to-do';

export const metadata: Metadata = {
  title: '모꼬지 | 세종대 동아리',
  description: '세종대 동아리 전체 목록',
  openGraph: {
    title: '모꼬지 | 세종대 동아리',
    description: '세종대 동아리 전체 목록',
    images: ['/mokkojiBanner.png'],
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col items-center justify-center px-4 pt-4 lg:pt-10">
      {children}

      <DevTodo
        id="15344eb7-e1e6-403a-9c91-7fff8afb3eaf"
        name="sins051301"
        description="이거 수정"
        todos={['test1', 'test2']}
        x={324}
        y={477}
      />

      <DevTodo
        id="500ac5bd-8357-490c-92b5-9588f99f7cce"
        name="sins051301"
        description="이거다"
        todos={['test1', 'test2']}
        x={1001}
        y={228}
      />
    </main>
  );
}
