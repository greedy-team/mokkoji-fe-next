import { notFound } from 'next/navigation';
import QueryProvider from '@/shared/lib/QueryProvider';
import { isValidUniversityCode } from '@/shared/lib/universityMeta';
import NotificationStreamMount from '@/widgets/notification/ui/NotificationStreamMount';

const userQueryOptions = {
  queries: {
    staleTime: 10 * 60 * 1000,
    retry: 1,
  },
};

export default async function UniversityCodeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ universityCode: string }>;
}) {
  const { universityCode } = await params;

  if (!isValidUniversityCode(universityCode)) {
    notFound();
  }

  return (
    <QueryProvider defaultOptions={userQueryOptions}>
      <NotificationStreamMount />
      {children}
    </QueryProvider>
  );
}
