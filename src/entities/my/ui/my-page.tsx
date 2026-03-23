import { getSession } from '@/shared/lib/cookie-session';
import { UserRole } from '@/shared/model/type';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import HeaderAdminLink from '@/features/header/ui/header-admin-link';
import Image from 'next/image';
import LoginRequired from '@/shared/ui/login-required';
import ScrollProgressBar from '@/shared/ui/scroll-progress-bar';
import getMyInfo from '../api/getMyInfo';
import InfoRow from './info-row';
import EmailChangeDialog from '../../../features/my/ui/email-change-dialog';
import EmailDeleteButton from '../../../features/my/ui/email-delete-button';
import MailNotificationToggle from '../../../features/my/ui/mail-notification-toggle';
import LogoutLink from '../../../features/my/ui/logout-link';

async function MyPage() {
  const session = await getSession();

  if (!session) {
    return <LoginRequired />;
  }

  const myInfo = await getMyInfo();

  if (!myInfo.ok || !myInfo.data) {
    return <ErrorBoundaryUi />;
  }

  const { user } = myInfo.data;
  const userRole = session?.role || UserRole.NORMAL;
  const isAdmin = userRole !== UserRole.NORMAL;

  return (
    <div className="flex flex-col items-center px-4">
      <ScrollProgressBar />
      <div className="w-full">
        <div>
          <InfoRow label="학번" value={user.studentId} />
          <InfoRow label="학과" value={user.department} />
          <InfoRow label="이름" value={user.name} />
          <InfoRow label="학년" value={user.grade} />
          <InfoRow label="이메일" value={user.email}>
            <div className="flex items-center gap-3">
              <EmailChangeDialog
                initialEmail={user.email}
                isEmailOn={user.emailOn}
                triggerClassName="text-[#00E457] text-sm"
              />
              {user.email && <EmailDeleteButton />}
            </div>
          </InfoRow>
          <InfoRow label="메일 알림">
            <MailNotificationToggle
              email={user.email}
              isEmailOn={user.emailOn}
            />
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
