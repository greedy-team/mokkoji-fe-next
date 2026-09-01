'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';
import {
  ADSENSE_CLIENT_ID,
  ADSENSE_SLOT,
  type AdSenseSlotName,
} from '@/shared/lib/adsense';

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

export default function GoogleAdSense({
  slotName,
}: {
  slotName: AdSenseSlotName;
}) {
  const slot = ADSENSE_SLOT[slotName];
  const containerRef = useRef<HTMLModElement>(null);
  const hasRequestedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        if (hasRequestedRef.current) return;

        hasRequestedRef.current = true;
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
      },
      { rootMargin: '200px' },
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  if (!slot) return null;

  return (
    <div className="flex justify-center py-2">
      {/* 루트에서 전역 로드하면 로그인·마이페이지 등 콘텐츠 없는 화면까지 광고가 붙는다 */}
      <Script
        id="google-adsense"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
        strategy="lazyOnload"
        crossOrigin="anonymous"
      />
      <ins
        ref={containerRef}
        className="adsbygoogle block w-full max-w-[728px]"
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
