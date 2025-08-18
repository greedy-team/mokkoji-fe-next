import DevTodo from '@/shared/ui/dev-to-do';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '모꼬지 | 전체 동아리',
  description: '세종대학교 동아리 전체 목록',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col items-center justify-center px-3 pt-2 sm:pt-2 lg:pt-10">
      <DevTodo
        id="club"
        todos={['test1', 'test2']}
        name="sins051301"
        description="test"
        x={688}
        y={83}
      />
      {children}
    </main>
  );
}
