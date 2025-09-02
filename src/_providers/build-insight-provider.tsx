'use client';

import dynamic from 'next/dynamic';

export const ClarityProvider = dynamic(
  () => import('@/_providers/clarity-provider'),
  { ssr: false, loading: () => null },
);

export const SpeedInsights = dynamic(
  () => import('@vercel/speed-insights/next').then((m) => m.SpeedInsights),
  { ssr: false, loading: () => null },
);

const ToastContainer = dynamic(
  () => import('react-toastify').then((m) => m.ToastContainer),
  { ssr: false, loading: () => null },
);

export default function BuildInsightProvider() {
  return (
    <>
      <ClarityProvider />
      <SpeedInsights />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover={false}
        draggable
        toastClassName="!z-[9999]"
        theme="light"
      />
    </>
  );
}
