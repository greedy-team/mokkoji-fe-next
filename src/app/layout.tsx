import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import BuildInsightProvider from '@/_providers/build-insight-provider';

const pretendard = localFont({
  src: [
    {
      path: '../shared/fonts/Pretendard-Thin.woff2',
      weight: '100',
    },
    {
      path: '../shared/fonts/Pretendard-ExtraLight.woff2',
      weight: '200',
    },
    {
      path: '../shared/fonts/Pretendard-Light.woff2',
      weight: '300',
    },
    {
      path: '../shared/fonts/Pretendard-Regular.woff2',
      weight: '400',
    },
    {
      path: '../shared/fonts/Pretendard-Medium.woff2',
      weight: '500',
    },
    {
      path: '../shared/fonts/Pretendard-SemiBold.woff2',
      weight: '600',
    },
    {
      path: '../shared/fonts/Pretendard-Bold.woff2',
      weight: '700',
    },
    {
      path: '../shared/fonts/Pretendard-ExtraBold.woff2',
      weight: '800',
    },
    {
      path: '../shared/fonts/Pretendard-Black.woff2',
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
      <body className={`${pretendard.className}`}>
        <BuildInsightProvider />
        {children}
      </body>
    </html>
  );
}
