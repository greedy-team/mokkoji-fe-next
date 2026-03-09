'use client';

import React, { useEffect, useState } from 'react';

interface SentryFallbackProps {
  error: unknown;
  resetError: () => void;
}

export default function SentryFallback({
  error,
  resetError,
}: SentryFallbackProps) {
  const [message, setMessage] = useState('예기치 못한 오류가 발생했습니다.');

  useEffect(() => {
    if (
      error instanceof Error ||
      (typeof error === 'object' && error !== null && 'message' in error)
    ) {
      setMessage((error.message as string) || '알 수 없는 오류 발생');
    }
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-red-50 px-4 text-center text-red-900">
      <h1 className="mb-4 text-3xl font-bold">🚨 오류가 발생했습니다</h1>
      <p className="mb-2 text-lg">{message}</p>
      <p className="mb-6 text-sm text-gray-600">
        오류가 지속되면 관리자에게 문의해 주세요.
      </p>
      <button
        type="button"
        onClick={resetError}
        className="cursor-pointer rounded bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
      >
        🔄 다시 시도하기
      </button>
    </div>
  );
}
