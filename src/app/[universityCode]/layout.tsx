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

  if (!isValidUniversityCode(universityCode)) {
    notFound();
  }

  return children;
}
