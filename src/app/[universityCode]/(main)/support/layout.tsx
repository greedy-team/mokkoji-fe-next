import type { Metadata } from 'next';
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
    title: `모꼬지 | ${universityName} 동아리 고객센터`,
    description: `${universityName} 동아리 고객센터`,
    // 학교와 무관하게 본문이 동일해 학교별 사본이 중복으로 잡히지 않도록 정본을 하나로 모은다
    alternates: { canonical: 'https://mokkoji.site/sejong/support' },
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
