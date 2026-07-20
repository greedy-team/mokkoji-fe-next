import HomePage from '@/views/home/ui/home-page';
import { getUniversityName } from '@/shared/lib/universityMeta';

function Page() {
  return (
    <HomePage
      universityName={getUniversityName('SEJONG')}
      universityCode="SEJONG"
    />
  );
}

export default Page;
