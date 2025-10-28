import MyPage from '@/entities/my/ui/my-page';

export const revalidate = 3600;

function page() {
  return <MyPage />;
}

export default page;
