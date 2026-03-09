'use client';

import { useState } from 'react';
import LoginModal from '@/widgets/login/ui/login-modal';

function LoginRequired() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-full min-h-[50vh] flex-col items-center justify-center gap-[10px]">
      <h1 className="text-sm font-bold lg:text-2xl">
        로그인이 필요한 서비스예요!
      </h1>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="font-semibold text-[#00E457] underline"
      >
        로그인하기
      </button>
      <LoginModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default LoginRequired;
