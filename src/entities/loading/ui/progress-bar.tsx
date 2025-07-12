'use client';

import React, { useEffect, useState } from 'react';

export default function ProgressBar() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (percent < 95) {
      const timer = setTimeout(() => setPercent(percent + 1), 15);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [percent]);

  return (
    <div className="flex w-full max-w-xs flex-col items-center">
      <div className="relative mb-2 h-4 w-full rounded-full bg-gray-200">
        <div
          className="absolute top-0 left-0 h-4 rounded-full bg-green-500 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-green-500">
          {percent}%
        </span>
        <span className="absolute top-1/2 right-[-30px] flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-yellow-400 bg-yellow-200 font-bold text-yellow-700 shadow">
          성
        </span>
      </div>
    </div>
  );
}
