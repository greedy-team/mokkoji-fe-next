import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import BuildInsightProvider from '@/_providers/build-insight-provider';
import WebVitalProvider from '@/_providers/webvital-provider';
import Script from 'next/script';

const pretendard = localFont({
  src: [
    {
      path: '../shared/fonts/Pretendard-Thin.ttf',
      weight: '100',
    },
    {
      path: '../shared/fonts/Pretendard-ExtraLight.ttf',
      weight: '200',
    },
    {
      path: '../shared/fonts/Pretendard-Light.ttf',
      weight: '300',
    },
    {
      path: '../shared/fonts/Pretendard-Regular.ttf',
      weight: '400',
    },
    {
      path: '../shared/fonts/Pretendard-Medium.ttf',
      weight: '500',
    },
    {
      path: '../shared/fonts/Pretendard-SemiBold.ttf',
      weight: '600',
    },
    {
      path: '../shared/fonts/Pretendard-Bold.ttf',
      weight: '700',
    },
    {
      path: '../shared/fonts/Pretendard-ExtraBold.ttf',
      weight: '800',
    },
    {
      path: '../shared/fonts/Pretendard-Black.ttf',
      weight: '900',
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
      <body className={`${pretendard.className}`}>
        <WebVitalProvider />
        <BuildInsightProvider />
        {children}
      </body>
    </html>
  );
}
