import ClubApplicationTabs from '@/widgets/club-application/ui/club-application-tab';
import getUniversities from '@/entities/university/api/getUniversities';

async function ClubApplicationPage() {
  const universitiesRes = await getUniversities();
  const universities = universitiesRes.data?.universities ?? [];

  return <ClubApplicationTabs universities={universities} />;
}

export default ClubApplicationPage;
