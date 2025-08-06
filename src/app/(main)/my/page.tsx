import MyPage from '@/entities/my/ui/my-page';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function page() {
  return <MyPage />;
}

export default page;
