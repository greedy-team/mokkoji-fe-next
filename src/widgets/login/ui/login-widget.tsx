'use client';

import LoginHeader from '@/entities/login/ui/login-header';
import LoginForm from '@/features/login/ui/login-form';
import { useEffect, useState } from 'react';

function LoginWidget() {
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('loginNoticeConfirmed');
    if (stored === 'true') {
      setConfirmed(true);
    }
  }, []);
  return (
    <>
      <LoginHeader confirmed={confirmed} onConfirm={setConfirmed} />
      <LoginForm confirmed={confirmed} />
    </>
  );
}

export default LoginWidget;
