import DashboardHeader from '@/shared/ui/DashboardHeader';

export default function DashboardMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <DashboardHeader />
      <main className="mt-[85px] flex-1">{children}</main>
    </div>
  );
}
