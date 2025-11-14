import 'react-toastify/dist/ReactToastify.css';
import Header from '@/shared/ui/header';
import Footer from '@/shared/ui/footer';
import 'to-do-pin/index.css';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
