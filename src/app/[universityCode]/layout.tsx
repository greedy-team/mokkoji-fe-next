import { notFound } from 'next/navigation';
import { isValidUniversityCode } from '@/shared/lib/universityMeta';

export default async function UniversityCodeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ universityCode: string }>;
}) {
  const { universityCode } = await params;

  // 안내 화면만 렌더하면 200이 나가 임의 주소가 색인 가능한 페이지로 남는다
  if (!isValidUniversityCode(universityCode)) {
    notFound();
  }

  return children;
}
