import { getSession } from '@/shared/lib/cookie-session';
import LoginRequired from '@/shared/ui/login-required';
import getMyClubMasterApplications from '@/entities/my/api/getMyClubMasterApplications';
import { toMasterCardItem } from '@/entities/my/lib/application-card';
import { APPLICATION_SECTION } from '@/entities/my/model/constants';
import ClubApplicationList from '@/features/my/ui/club-application-list';

interface PageProps {
  params: Promise<{ universityCode: string }>;
}

async function Page({ params }: PageProps) {
  const { universityCode } = await params;
  const session = await getSession();

  if (!session) {
    return <LoginRequired />;
  }

  const clubMasterStatus = await getMyClubMasterApplications();
  const items = (clubMasterStatus.data ?? []).map(toMasterCardItem);

  return (
    <div className="mx-auto w-full px-4 sm:w-lg">
      <ClubApplicationList
        title={APPLICATION_SECTION.master.title}
        items={items}
        universityCode={universityCode}
        showLogo
      />
    </div>
  );
}

export default Page;
