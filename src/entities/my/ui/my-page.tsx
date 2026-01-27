import { auth } from '@/auth';
import { UserRole } from '@/shared/model/type';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import HeaderAdminLink from '@/features/header/ui/header-admin-link';
import Image from 'next/image';
import getMyInfo from '../api/getMyInfo';
import InfoRow from './info-row';
import EmailChangeDialog from './email-change-dialog';
import MailNotificationToggle from './mail-notification-toggle';
import LogoutLink from './logout-link';

async function MyPage() {
  const myInfo = await getMyInfo();
  const session = await auth();

  if (!myInfo.ok || !myInfo.data) {
    return <ErrorBoundaryUi />;
  }

  const { user } = myInfo.data;
  const userRole = (session?.user?.role as UserRole) || UserRole.NORMAL;
  const isAdmin = userRole !== UserRole.NORMAL;

  return (
    <div className="flex flex-col items-center px-4">
      <div className="w-full">
        <div>
          <InfoRow label="학번" value={user.studentId} />
          <InfoRow label="학과" value={user.department} />
          <InfoRow label="이름" value={user.name} />
          <InfoRow label="학년" value={user.grade} />
          <InfoRow label="이메일" value={user.email}>
            <EmailChangeDialog
              initialEmail={user.email}
              triggerClassName="text-[#00E457] text-sm"
            />
          </InfoRow>
          <InfoRow label="메일 알림">
            <MailNotificationToggle />
          </InfoRow>
          {isAdmin && (
            <div className="mt-6 flex items-center gap-2">
              <HeaderAdminLink role={userRole} isLoggedIn={!!session} />
              <Image src="/nextBlack.svg" alt="" width={8} height={12} />
            </div>
          )}

          <div className="py-4 lg:hidden">
            <LogoutLink />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
