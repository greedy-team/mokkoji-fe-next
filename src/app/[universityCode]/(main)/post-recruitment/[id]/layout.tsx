import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { getUniversityName } from '@/shared/lib/universityMeta';
import { toApiCode } from '@/shared/lib/urlCodeConverter';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ universityCode: string }>;
}): Promise<Metadata> {
  const { universityCode } = await params;
  const universityName = getUniversityName(universityCode);

  return {
    title: `모꼬지 | ${universityName} 동아리 모집 공고 작성`,
    description: `${universityName} 동아리 모집 공고 작성 페이지`,
    openGraph: {
      title: `모꼬지 | ${universityName} 동아리 모집 공고 작성`,
      description: `${universityName} 동아리 모집 공고 작성 페이지`,
      images: ['/mokkojiBanner.png'],
    },
  };
}

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <main className="flex justify-center py-15">{children}</main>;
}
