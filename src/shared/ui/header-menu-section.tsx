'use client';

import { UserRole } from '@/shared/model/type';
import { Session } from 'next-auth';
import HeaderLogin from '@/features/header/ui/header-login';
import HeaderAdminLink from '@/features/header/ui/header-admin-link';
import MobileHeader from './mobile-header';

function HeaderMenuSection({
  role,
  session,
}: {
  role?: UserRole;
  session: Session | null;
}) {
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
