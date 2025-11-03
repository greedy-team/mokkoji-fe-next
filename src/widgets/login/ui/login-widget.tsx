'use client';

import LoginHeader from '@/entities/login/ui/login-header';
import LoginForm from '@/features/login/ui/login-form';
import { useEffect, useState } from 'react';

function LoginWidget() {
  const [confirmed, setConfirmed] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('loginNoticeConfirmed');
    if (stored === 'true') {
      setConfirmed(true);
    }
  }, []);

  useEffect(() => {
    if (confirmed) {
      localStorage.setItem('loginNoticeConfirmed', 'true');
    } else {
      localStorage.setItem('loginNoticeConfirmed', 'false');
    }
  }, [confirmed]);
  return (
    <>
      <LoginHeader
        confirmed={confirmed}
        onConfirm={setConfirmed}
        open={open}
        setOpen={setOpen}
      />
      <LoginForm confirmed={confirmed} setOpen={setOpen} />
    </>
  );
}

export default LoginWidget;
