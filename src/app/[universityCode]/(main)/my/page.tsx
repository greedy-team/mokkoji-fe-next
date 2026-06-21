import MyPage from '@/entities/my/ui/my-page';

interface PageProps {
  searchParams: Promise<{ newUser?: string }>;
}

async function Page({ searchParams }: PageProps) {
  const { newUser } = await searchParams;
  return <MyPage isNewUser={newUser === 'true'} />;
}

export default Page;
