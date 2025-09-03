import 'react-toastify/dist/ReactToastify.css';
import Header from '@/shared/ui/Header';
import Footer from '@/shared/ui/Footer';
import { DevTodoProvider } from '@/shared/model/dev-todo-provider';
import DevTodoTracker from '@/shared/ui/dev-to-do-tracker';
import DevTodoGlobalClient from '@/shared/ui/dev-client-global';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DevTodoProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        {process.env.NEXT_PUBLIC_NODE_ENV === 'development' && (
          <DevTodoTracker />
        )}
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
      <DevTodoGlobalClient />
    </DevTodoProvider>
  );
}
