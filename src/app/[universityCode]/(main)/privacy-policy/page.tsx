import type { Metadata } from 'next';
import PrivacyPolicyPage from '@/views/privacy-policy/ui/privacy-policy-page';

export const metadata: Metadata = {
  // 학교와 무관하게 본문이 동일해 학교별 사본이 중복으로 잡히지 않도록 정본을 하나로 모은다
  alternates: { canonical: 'https://mokkoji.site/sejong/privacy-policy' },
};

function Page() {
  return <PrivacyPolicyPage />;
}

export default Page;
