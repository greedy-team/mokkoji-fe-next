'use client';

import HeaderSearch from '@/features/header/ui/header-search';
import { UserRole } from '@/shared/model/type';
import { Session } from 'next-auth';
import { useState } from 'react';
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
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      {!showSearch && (
        <>
          <HeaderAdminLink role={role} isLoggedIn={!!session} />
          <MobileHeader
            sessionRole={role}
            manageClubInfo={session?.manageClubInfo || []}
          />
          <HeaderLogin userName={session?.user?.name || ''} />
        </>
      )}
      <HeaderSearch showSearch={showSearch} setShowSearch={setShowSearch} />
    </>
  );
}

export default HeaderMenuSection;
