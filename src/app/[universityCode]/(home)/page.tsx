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
  const universityName = getUniversityName(urlCodeToApiCode(universityCode));

  return <HomePage universityName={universityName} />;
}

export default Page;
