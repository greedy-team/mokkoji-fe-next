import { getSession } from '@/shared/lib/cookie-session';
import LoginRequired from '@/shared/ui/login-required';
import getClubApplicationStatus from '@/entities/my/api/getClubApplicationStatus';
import { toCreateCardItem } from '@/entities/my/lib/application-card';
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
        title="동아리 생성 신청"
        items={items}
        universityCode={universityCode}
      />
    </div>
  );
}

export default Page;
