import 'react-toastify/dist/ReactToastify.css';
import Header from '@/shared/ui/Header';
import Footer from '@/shared/ui/Footer';
import { SessionProvider } from 'next-auth/react';
import { ToDoPinProvider } from 'to-do-pin';
import 'to-do-pin/index.css';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <ToDoPinProvider>
        <SessionProvider>
          <Header />
          <main className="flex-grow">{children}</main>
        </SessionProvider>
      </ToDoPinProvider>
      <Footer />
    </div>
  );
}
