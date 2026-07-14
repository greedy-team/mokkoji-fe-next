import ErrorPage from '@/entities/error/ui/error-page';
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
    return (
      <ErrorPage
        statusCode={404}
        title="지원하지 않는 학교예요"
        message="입력하신 학교 주소를 찾을 수 없어요. 주소를 다시 확인해주세요."
        showHomeButton={false}
      />
    );
  }

  return children;
}
