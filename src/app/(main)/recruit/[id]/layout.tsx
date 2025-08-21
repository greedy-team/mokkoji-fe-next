import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '모꼬지 | 세종대 동아리 상세 페이지',
  description: '세종대 동아리 상세 페이지',
};

export default function Layout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="flex w-[95vw] flex-col items-center justify-center">
      {children}
      {modal}
    </main>
  );
}
