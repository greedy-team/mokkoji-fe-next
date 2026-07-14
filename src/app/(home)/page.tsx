import HomePage from '@/views/home/ui/home-page';
import { getUniversityName } from '@/shared/lib/universityMeta';

function Page() {
  return <HomePage universityName={getUniversityName('SEJONG')} />;
}

export default Page;
