import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/shared/ui/Header';
import { SessionProvider } from 'next-auth/react';
import Footer from '@/shared/ui/Footer';
import DevCursorGlobal from '@/shared/ui/dev-cursor-inspector';
import { DevTodoProvider } from '@/shared/model/dev-todo-provider';
import DevTodoTracker from '@/shared/ui/dev-to-do-tracker';
import ClarityProvider from '@/_providers/clarity-provider';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ClarityProvider>
        <DevTodoProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            {process.env.NEXT_PUBLIC_NODE_ENV === 'development' && (
              <>
                <DevCursorGlobal />
                <DevTodoTracker />
              </>
            )}
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnHover={false}
              draggable
              toastClassName="!z-[9999]"
              theme="light"
            />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </DevTodoProvider>
      </ClarityProvider>
    </SessionProvider>
  );
}
