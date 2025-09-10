import 'react-toastify/dist/ReactToastify.css';
import 'next-dev-pin/dist/index.css';
import Header from '@/shared/ui/Header';
import Footer from '@/shared/ui/Footer';
import { DevPinProvider } from 'next-dev-pin';
import { SessionProvider } from 'next-auth/react';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DevPinProvider>
      <div className="flex min-h-screen flex-col">
        <SessionProvider>
          <Header />
          <main className="flex-grow">{children}</main>
        </SessionProvider>
        <Footer />
      </div>
    </DevPinProvider>
  );
}
