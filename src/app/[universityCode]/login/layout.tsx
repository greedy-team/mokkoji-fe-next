import 'react-toastify/dist/ReactToastify.css';
import Header from '@/shared/ui/Header';
import Footer from '@/shared/ui/Footer';
import BottomNav from '@/shared/ui/bottom-nav';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function LoginLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ universityCode: string }>;
}) {
  const { universityCode } = await params;

  return (
    <div className="flex h-screen w-full flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer universityCode={universityCode} />
      <BottomNav />
    </div>
  );
}
