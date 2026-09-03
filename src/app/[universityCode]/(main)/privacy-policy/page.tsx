import type { Metadata } from 'next';
import PrivacyPolicyPage from '@/views/privacy-policy/ui/privacy-policy-page';

export const metadata: Metadata = {
  alternates: { canonical: 'https://mokkoji.site/sejong/privacy-policy' },
};

function Page() {
  return <PrivacyPolicyPage />;
}

export default Page;
