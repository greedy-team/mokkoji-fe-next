'use client';

import { useLoginModal } from '@/shared/lib/login-modal-context';

function LoginRequired() {
  const { openLoginModal } = useLoginModal();

  return (
    <div className="flex h-full min-h-[50vh] flex-col items-center justify-center gap-[10px]">
      <h1 className="text-sm font-bold lg:text-2xl">
        로그인이 필요한 서비스예요!
      </h1>
      <button
        type="button"
        onClick={openLoginModal}
        className="font-semibold text-[#00E457] underline"
      >
        로그인하기
      </button>
    </div>
  );
}

export default LoginRequired;
