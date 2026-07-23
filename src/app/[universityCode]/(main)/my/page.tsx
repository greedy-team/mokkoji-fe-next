import MyPage from '@/entities/my/ui/my-page';

interface PageProps {
  params: Promise<{ universityCode: string }>;
  searchParams: Promise<{ newUser?: string }>;
}

async function Page({ params, searchParams }: PageProps) {
  const { universityCode } = await params;
  const { newUser } = await searchParams;
  return (
    <MyPage universityCode={universityCode} isNewUser={newUser === 'true'} />
  );
}

export default Page;
