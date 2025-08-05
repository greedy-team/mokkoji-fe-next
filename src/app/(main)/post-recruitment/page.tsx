import { auth } from '@/auth';
import { UserRole } from '@/shared/model/type';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import PostRecruitmentPage from '@/views/post-recruitment/post-recruitment-page';
import { redirect } from 'next/navigation';

async function Page() {
  const session = await auth();
  const role = session?.role;

  if (!session || !session.user) {
    redirect('/login');
  }

  if (
    role !== UserRole.GREEDY_ADMIN &&
    role !== UserRole.CLUB_ADMIN &&
    role !== UserRole.CLUB_MASTER
  ) {
    return <ErrorBoundaryUi message="페이지 접근 권한이 없습니다." />;
  }
  return <PostRecruitmentPage />;
}

export default Page;
