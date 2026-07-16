import { getSession } from '@/shared/lib/cookie-session';
import { UserRole } from '@/shared/model/type';
import getClubManageInfo from '@/shared/api/manage-api';
import UniversitySelectModalWrapper from '@/widgets/login/ui/university-select-modal-wrapper';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import HeaderAdminLink from '@/features/header/ui/header-admin-link';
import Image from 'next/image';
import LoginRequired from '@/shared/ui/login-required';
import ScrollProgressBar from '@/shared/ui/scroll-progress-bar';
import { getUniversityName } from '@/shared/lib/universityMeta';
import getUniversities from '@/entities/university/api/getUniversities';
import getMyInfo from '@/entities/my/api/getMyInfo';
import getClubApplicationStatus from '@/entities/my/api/getClubApplicationStatus';
import getMyClubMasterApplications from '@/entities/my/api/getMyClubMasterApplications';
import {
  toCreateCardItem,
  toMasterCardItem,
} from '@/entities/my/lib/application-card';
import InfoRow from '@/entities/my/ui/info-row';
import EmailChangeDialog from '@/features/my/ui/email-change-dialog';
import EmailDeleteButton from '@/features/my/ui/email-delete-button';
import MailNotificationToggle from '@/features/my/ui/mail-notification-toggle';
import LogoutLink from '@/features/my/ui/logout-link';
import WithdrawButton from '@/features/my/ui/withdraw-button';
import ClubApplicationStatus from '@/features/my/ui/club-application-status';
import ClubMasterTransferSection from '@/features/my/ui/club-master-transfer-section';
import ClubMasterTransferCodeSection from '@/features/my/ui/club-master-transfer-code-section';

async function MyPage({
  universityCode,
  isNewUser = false,
}: {
  universityCode: string;
  isNewUser?: boolean;
}) {
  const session = await getSession();

  if (!session) {
    return <LoginRequired />;
  }

  const userRole = session?.role || UserRole.NORMAL;

  const [
    myInfo,
    universitiesRes,
    clubApplicationStatus,
    clubMasterStatus,
    clubManageInfo,
  ] = await Promise.all([
    getMyInfo(),
    getUniversities(),
    getClubApplicationStatus(),
    getMyClubMasterApplications(),
    getClubManageInfo({ role: userRole }),
  ]);

  if (!myInfo.ok || !myInfo.data) {
    return <ErrorBoundaryUi />;
  }

  const user = myInfo.data;
  const universities = universitiesRes.data?.universities ?? [];
  const createItems = (clubApplicationStatus.data?.clubApplications ?? []).map(
    toCreateCardItem,
  );
  const masterItems = (clubMasterStatus.data ?? []).map(toMasterCardItem);
  const isAdmin = userRole !== UserRole.CLUB_MASTER;
  const managedClubs =
    userRole === UserRole.CLUB_MASTER ? (clubManageInfo.data?.clubs ?? []) : [];

  return (
    <>
      <ScrollProgressBar />
      <div className="mx-auto w-full px-4 sm:w-lg">
        <div className="mb-8 flex flex-col gap-2">
          <div className="text-text-secondary">{user.name}</div>
          <div className="flex w-[130px] items-center gap-2 rounded-full bg-[#FEE500] px-3 py-2.5">
            <Image src="/chatIcon.svg" alt="챗아이콘" width={16} height={16} />
            <span className="text-sm text-neutral-900">카카오 로그인</span>
          </div>
        </div>

        <ClubMasterTransferSection clubs={managedClubs} />

        <ClubApplicationStatus
          createItems={createItems}
          masterItems={masterItems}
          universityCode={universityCode}
        />

        <div className="flex flex-col">
          <span className="mb-4 font-semibold">내 정보</span>
          <ClubMasterTransferCodeSection userCode={user.userCode} />
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

          <InfoRow
            label="학교"
            value={
              user.universityCode ? getUniversityName(user.universityCode) : '-'
            }
          />
          {isAdmin && (
            <div className="mt-6 flex items-center gap-2">
              <HeaderAdminLink role={userRole} isLoggedIn={!!session} />
              <Image src="/nextBlack.svg" alt="" width={8} height={12} />
            </div>
          )}
          <div className="pt-6">
            <UniversitySelectModalWrapper
              defaultOpen={isNewUser}
              universityCode={user.universityCode}
              universities={universities}
            />
          </div>
          <div className="pt-6">
            <LogoutLink />
          </div>
          <div className="mt-2 mb-15">
            <WithdrawButton />
          </div>
        </div>
      </div>
    </>
  );
}

export default MyPage;
