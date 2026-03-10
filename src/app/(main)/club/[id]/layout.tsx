import PageContainer from '@/shared/ui/page-container';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PageContainer
      as="main"
      className="flex flex-col items-center justify-center"
    >
      {children}
    </PageContainer>
  );
}
