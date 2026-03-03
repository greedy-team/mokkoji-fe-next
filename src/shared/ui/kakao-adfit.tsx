'use client';

import { useEffect } from 'react';

export default function KakaoAdFit() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/kas/static/ba.min.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
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
    </>
  );
}
