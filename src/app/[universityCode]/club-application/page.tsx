import { getSession } from '@/shared/lib/cookie-session';
import ClubApplicationPage from '@/views/club-application/ui/club-application-page';
import { redirect } from 'next/navigation';

async function Page() {
  const session = await getSession();
  if (!session) {
    redirect('/');
  }
  return <ClubApplicationPage />;
}

export default Page;
