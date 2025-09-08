import 'react-toastify/dist/ReactToastify.css';
import Header from '@/shared/ui/Header';
import Footer from '@/shared/ui/Footer';
import { DevTodoProvider } from '@/shared/model/dev-todo-provider';
import DevTodoTracker from '@/shared/ui/dev-to-do-tracker';
import DevTodoGlobalClient from '@/shared/ui/dev-client-global';
import { SessionProvider } from 'next-auth/react';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DevTodoProvider>
      <div className="flex min-h-screen flex-col">
        <SessionProvider>
          <Header />
          {process.env.NEXT_PUBLIC_NODE_ENV === 'development' && (
            <>
              <DevTodoTracker />
              <DevTodoGlobalClient />
            </>
          )}
          <main className="flex-grow">{children}</main>
        </SessionProvider>
        <Footer />
      </div>
    </DevTodoProvider>
  );
}
