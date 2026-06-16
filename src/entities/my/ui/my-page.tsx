import { getSession } from '@/shared/lib/cookie-session';
import { UserRole } from '@/shared/model/type';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import HeaderAdminLink from '@/features/header/ui/header-admin-link';
import Image from 'next/image';
import LoginRequired from '@/shared/ui/login-required';
import ScrollProgressBar from '@/shared/ui/scroll-progress-bar';
import getMyInfo from '../api/getMyInfo';
import getClubApplicationStatus from '../api/getClubApplicationStatus';
import InfoRow from './info-row';
import EmailChangeDialog from '../../../features/my/ui/email-change-dialog';
import EmailDeleteButton from '../../../features/my/ui/email-delete-button';
import MailNotificationToggle from '../../../features/my/ui/mail-notification-toggle';
import LogoutLink from '../../../features/my/ui/logout-link';
import ClubApplicationStatus from '../../../features/my/ui/club-application-status';

async function MyPage() {
  const session = await getSession();

  if (!session) {
    return <LoginRequired />;
  }

  const [myInfo, clubApplicationStatus] = await Promise.all([
    getMyInfo(),
    getClubApplicationStatus(),
  ]);

  if (!myInfo.ok || !myInfo.data) {
    return <ErrorBoundaryUi />;
  }

  const user = myInfo.data;
  const clubApplications = clubApplicationStatus.data?.clubApplications ?? [];
  const userRole = session?.role || UserRole.NORMAL;
  const isAdmin = userRole !== UserRole.NORMAL;

  return (
    <>
      <ScrollProgressBar />
      <div className="mx-auto w-full px-4 sm:w-lg">
        <div className="mb-6 flex flex-col gap-2">
          <div className="text-text-secondary">{user.name}</div>
          <div className="flex w-[130px] items-center gap-2 rounded-full bg-[#FEE500] px-3 py-2.5">
            <svg
              className="left-4 h-4 w-4 shrink-0"
              viewBox="0 0 22 22"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11 2C6.029 2 2 5.358 2 9.5c0 2.613 1.613 4.913 4.063 6.263L5.25 19.25l4.013-2.65c.572.083 1.158.125 1.737.125 4.971 0 9-3.358 9-7.5S15.971 2 11 2z"
                fill="#1A1A1A"
              />
            </svg>
            <span className="text-sm text-neutral-900">카카오 로그인</span>
          </div>
        </div>

        {clubApplications.length > 0 && (
          <ClubApplicationStatus applications={clubApplications} />
        )}

        <div className="flex flex-col">
          <span className="mb-4 font-semibold">내 정보</span>
          <InfoRow label="이메일" value={user.email}>
            <div className="flex items-center gap-3">
              <EmailChangeDialog
                initialEmail={user.email ?? undefined}
                isEmailOn={user.emailOn}
                triggerClassName="text-[#00E457] text-sm"
              />
              {user.email && <EmailDeleteButton />}
            </div>
          </InfoRow>
          <InfoRow label="메일 알림">
            <MailNotificationToggle
              email={user.email ?? ''}
              isEmailOn={user.emailOn}
            />
          </InfoRow>
          {isAdmin && (
            <div className="mt-6 flex items-center gap-2">
              <HeaderAdminLink role={userRole} isLoggedIn={!!session} />
              <Image src="/nextBlack.svg" alt="" width={8} height={12} />
            </div>
          )}

          <div className="mb-15 py-4 lg:hidden">
            <LogoutLink />
          </div>
        </div>
      </div>
    </>
  );
}

export default MyPage;
