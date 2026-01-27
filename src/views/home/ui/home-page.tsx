import { cookies } from 'next/headers';
import DeskTopHomePage from './desktop-home-page';
import MobileHomePage from './mobile-home-page';

async function HomePage() {
  const cookieStore = await cookies();
  const deviceType = cookieStore.get('x-device-type')?.value;

  if (deviceType === 'mobile') {
    return <MobileHomePage />;
  }

  return <DeskTopHomePage />;
}

export default HomePage;
