import type { Metadata } from 'next';
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
    title: `모꼬지 | ${universityName} 동아리`,
    description: `${universityName} 동아리 전체 목록`,
    alternates: {
      canonical: `https://mokkoji.site/${universityCode}/club`,
    },
    openGraph: {
      title: `모꼬지 | ${universityName} 동아리`,
      description: `${universityName} 동아리 전체 목록`,
      url: `https://mokkoji.site/${universityCode}/club`,
      images: ['/mokkojiBanner.png'],
    },
  };
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col items-center justify-center px-4 pt-4 lg:pt-10">
      {children}
    </main>
  );
}
