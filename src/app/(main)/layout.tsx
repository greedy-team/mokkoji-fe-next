import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/shared/ui/Header';
import { SessionProvider } from 'next-auth/react';
import Footer from '@/shared/ui/Footer';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </SessionProvider>
  );
}
