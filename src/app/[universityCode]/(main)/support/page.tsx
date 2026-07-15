import SupportPage from '@/views/support/ui/support-page';

async function Page({
  params,
}: {
  params: Promise<{ universityCode: string }>;
}) {
  const { universityCode } = await params;
  return <SupportPage universityCode={universityCode} />;
}

export default Page;
