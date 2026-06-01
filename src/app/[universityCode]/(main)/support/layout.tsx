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
    title: `모꼬지 | ${universityName} 동아리 고객센터`,
    description: `${universityName} 동아리 고객센터`,
    openGraph: {
      title: `모꼬지 | ${universityName} 동아리 고객센터`,
      description: `${universityName} 동아리 고객센터`,
      url: `https://mokkoji.site/${universityCode}/support`,
      images: ['/mokkojiBanner.png'],
    },
  };
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="px-5 pt-7 pb-10 lg:p-25 lg:px-6">{children}</main>;
}
