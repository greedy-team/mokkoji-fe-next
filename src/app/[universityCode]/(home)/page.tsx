import HomePage from '@/views/home/ui/home-page';
import {
  getUniversityName,
  urlCodeToApiCode,
} from '@/shared/lib/universityMeta';

async function Page({
  params,
}: {
  params: Promise<{ universityCode: string }>;
}) {
  const { universityCode } = await params;
  const apiUniversityCode = urlCodeToApiCode(universityCode);
  const universityName = getUniversityName(apiUniversityCode);

  return (
    <HomePage
      universityName={universityName}
      universityCode={apiUniversityCode}
    />
  );
}

export default Page;
