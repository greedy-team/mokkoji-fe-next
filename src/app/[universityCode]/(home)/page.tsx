import HomePage from '@/views/home/ui/home-page';
import { getUniversityName } from '@/shared/lib/universityMeta';
import { toApiCode } from '@/shared/lib/urlCodeConverter';

async function Page({
  params,
}: {
  params: Promise<{ universityCode: string }>;
}) {
  const { universityCode } = await params;
  const apiUniversityCode = toApiCode(universityCode);
  const universityName = getUniversityName(apiUniversityCode);

  return (
    <HomePage
      universityName={universityName}
      universityCode={apiUniversityCode}
    />
  );
}

export default Page;
