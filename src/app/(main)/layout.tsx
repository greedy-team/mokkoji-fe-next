import 'react-toastify/dist/ReactToastify.css';
import Header from '@/shared/ui/Header';
import Footer from '@/shared/ui/Footer';
import { SessionProvider } from 'next-auth/react';
import { ToDoPinProvider } from 'to-do-pin';
import 'to-do-pin/index.css';
import QueryProvider from '@/_providers/query-provider';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <ToDoPinProvider>
        <SessionProvider refetchOnWindowFocus={false} refetchInterval={50 * 60}>
          <QueryProvider>
            <Header />
            <main className="flex-grow">{children}</main>
          </QueryProvider>
        </SessionProvider>
      </ToDoPinProvider>
      <Footer />
    </div>
  );
}
