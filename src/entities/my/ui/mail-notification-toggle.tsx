'use client';

import Image from 'next/image';
import { useState } from 'react';

type MailNotificationToggleProps = {
  initialEnabled?: boolean;
};

export default function MailNotificationToggle({
  initialEnabled = false,
}: MailNotificationToggleProps) {
  const [enabled, setEnabled] = useState(initialEnabled);

  const handleToggle = async () => {
    setEnabled(!enabled);
    // TODO: API 연동
  };

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label="메일 알림 설정"
        onClick={handleToggle}
        className={`relative h-7 w-14 rounded-full p-1 transition-colors ${
          enabled ? 'bg-[#00E457]' : 'bg-gray-300'
        }`}
      >
        <span
          className={`flex aspect-square h-full items-center justify-center rounded-full bg-white shadow transition-transform ${
            enabled ? 'translate-x-7' : 'translate-x-0'
          }`}
        >
          <Image src="/check.svg" alt="" width={11} height={10} />
        </span>
      </button>
      <span className="text-gray-600">{enabled ? 'ON' : 'OFF'}</span>
    </div>
  );
}
