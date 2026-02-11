import type { Metadata } from 'next';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import localFont from 'next/font/local';
import WebVitalProvider from '@/_providers/webvital-provider';
import Script from 'next/script';
import { ToDoPinProvider } from 'to-do-pin';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';

const pretendard = localFont({
  src: [
    {
      path: '../shared/fonts/PretendardVariable.woff2',
    },
  ],
  variable: '--font-pretendard',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '모꼬지 | 세종대 동아리',
  description: '세종대 동아리 통합 플랫폼',
  metadataBase: new URL('https://mokkoji.site'),
  openGraph: {
    title: '모꼬지 | 세종대 동아리',
    description: '세종대 동아리 통합 플랫폼',
  },
  other: {
    'naver-site-verification': '150a4435ae2108c4b46284bb245f020da60c9069',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2782954397492984"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-85PSBEJKQ2"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-85PSBEJKQ2');
  `}
        </Script>
      </head>
      <body className={`${pretendard.className} scrollbar-hide`}>
        <SessionProvider refetchOnWindowFocus={false} refetchInterval={50 * 60}>
          <ToDoPinProvider>
            <WebVitalProvider />
            <ToastContainer
              autoClose={2000}
              hideProgressBar
              closeOnClick
              pauseOnHover={false}
              newestOnTop
              limit={1}
            />
            {children}
          </ToDoPinProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
