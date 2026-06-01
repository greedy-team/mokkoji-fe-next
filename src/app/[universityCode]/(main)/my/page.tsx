import MyPage from '@/entities/my/ui/my-page';

export const revalidate = 3600;

function Page() {
  return <MyPage />;
}

export default Page;
