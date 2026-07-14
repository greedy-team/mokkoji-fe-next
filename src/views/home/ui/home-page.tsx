import { cookies } from 'next/headers';
import DeskTopHomePage from './desktop-home-page';
import MobileHomePage from './mobile-home-page';

interface HomePageProps {
  universityName: string;
}

async function HomePage({ universityName }: HomePageProps) {
  const cookieStore = await cookies();
  const deviceType = cookieStore.get('x-device-type')?.value;

  if (deviceType === 'mobile') {
    return <MobileHomePage universityName={universityName} />;
  }

  return <DeskTopHomePage universityName={universityName} />;
}

export default HomePage;
