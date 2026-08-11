'use client';

import { useEffect, useRef } from 'react';

export default function KakaoAdFit() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let script: HTMLScriptElement | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;

        script = document.createElement('script');
        script.src = '//t1.daumcdn.net/kas/static/ba.min.js';
        script.async = true;
        document.body.appendChild(script);

        observer.disconnect();
      },
      { rootMargin: '200px' },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div ref={containerRef}>
      <div className="flex justify-center py-2 sm:hidden">
        <ins
          className="kakao_ad_area"
          style={{ display: 'none' }}
          data-ad-unit="DAN-2sw9T3IKvhASVoPI"
          data-ad-width="320"
          data-ad-height="100"
        />
      </div>
      <div className="hidden justify-center py-2 sm:flex">
        <ins
          className="kakao_ad_area"
          style={{ display: 'none' }}
          data-ad-unit="DAN-WlqWMW33uI6dquqv"
          data-ad-width="728"
          data-ad-height="90"
        />
      </div>
    </div>
  );
}
