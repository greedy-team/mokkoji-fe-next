'use client';

import { UserRole, ManageClub } from '@/shared/model/type';
import HeaderLogin from '@/features/header/ui/header-login';
import HeaderAdminLink from '@/features/header/ui/header-admin-link';
import MobileHeader from './mobile-header';

interface HeaderMenuSectionProps {
  role?: UserRole;
  session: {
    user?: { name?: string };
    manageClubInfo?: ManageClub[];
  } | null;
}

function HeaderMenuSection({ role, session }: HeaderMenuSectionProps) {
  return (
    <>
      <HeaderAdminLink role={role} isLoggedIn={!!session} />
      <MobileHeader
        sessionRole={role}
        manageClubInfo={session?.manageClubInfo || []}
      />
      <HeaderLogin userName={session?.user?.name || ''} />
    </>
  );
}

export default HeaderMenuSection;
