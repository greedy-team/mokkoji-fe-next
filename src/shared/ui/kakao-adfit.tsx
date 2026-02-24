'use client';

import { useEffect, useRef } from 'react';

interface KakaoAdFitProps {
  adUnit: string;
  adWidth: number;
  adHeight: number;
}

export default function KakaoAdFit({
  adUnit,
  adWidth,
  adHeight,
}: KakaoAdFitProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!adRef.current || adRef.current.children.length > 0) return;

    const script = document.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.src = '//t1.daumcdn.net/kas/static/ba.min.js';
    adRef.current.insertAdjacentElement('afterend', script);
  }, []);

  return (
    <ins
      ref={adRef}
      className="kakao_ad_area"
      style={{ display: 'none' }}
      data-ad-unit={adUnit}
      data-ad-width={String(adWidth)}
      data-ad-height={String(adHeight)}
    />
  );
}
