import type { Metadata } from 'next';
import { ReactNode } from 'react';
import {
  getUniversityName,
  urlCodeToApiCode,
} from '@/shared/lib/universityMeta';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ universityCode: string }>;
}): Promise<Metadata> {
  const { universityCode } = await params;
  const universityName = getUniversityName(urlCodeToApiCode(universityCode));

  return {
    title: `모꼬지 | ${universityName} 동아리 검색`,
    description: `${universityName} 동아리 검색 페이지`,
    openGraph: {
      title: `모꼬지 | ${universityName} 동아리 검색`,
      description: `${universityName} 동아리 검색 페이지`,
      url: `https://mokkoji.site/${universityCode}/search`,
      images: ['/mokkojiBanner.png'],
    },
  };
}

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <main>{children}</main>;
}
