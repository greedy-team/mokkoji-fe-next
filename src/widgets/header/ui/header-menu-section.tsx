'use client';

import { UserRole, ManageClub } from '@/shared/model/type';
import HeaderLogin from '@/features/header/ui/header-login';
import HeaderAdminLink from '@/features/header/ui/header-admin-link';
import MobileHeader from '@/shared/ui/mobile-header';
import NotificationBell from '@/widgets/notification/ui/NotificationBell';

interface HeaderMenuSectionProps {
  role?: UserRole;
  session: {
    user?: { name?: string | null };
    manageClubInfo?: ManageClub[];
  } | null;
}

function HeaderMenuSection({ role, session }: HeaderMenuSectionProps) {
  return (
    <>
      <HeaderAdminLink isLoggedIn={!!session} />
      <NotificationBell />
      <MobileHeader
        sessionRole={role}
        manageClubInfo={session?.manageClubInfo || []}
      />
      <HeaderLogin userName={session?.user?.name || ''} />
    </>
  );
}

export default HeaderMenuSection;
