import { getSession } from '@/shared/lib/cookie-session';
import LoginRequired from '@/shared/ui/login-required';
import getClubApplicationStatus from '@/entities/my/api/getClubApplicationStatus';
import { toCreateCardItem } from '@/entities/my/lib/application-card';
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

  const clubApplicationStatus = await getClubApplicationStatus();
  const items = (clubApplicationStatus.data?.clubApplications ?? []).map(
    toCreateCardItem,
  );

  return (
    <div className="mx-auto w-full px-4 sm:w-lg">
      <ClubApplicationList
        title={APPLICATION_SECTION.create.title}
        items={items}
        universityCode={universityCode}
      />
    </div>
  );
}

export default Page;
