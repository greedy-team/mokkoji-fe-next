import type { Metadata } from 'next';
import DevTodo from '@/shared/ui/dev-to-do';

export const metadata: Metadata = {
  title: '모꼬지 | 즐겨찾기',
  description: '세종대학교 동아리 즐겨찾기',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col items-center justify-center pt-10">
      <DevTodo
        id="favorite"
        todos={['test3', 'test4']}
        name="sins051301"
        description="test"
        x={688}
        y={83}
      />
      {children}
    </main>
  );
}
