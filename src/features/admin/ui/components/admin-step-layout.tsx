'use client';

import Image from 'next/image';

interface AdminStepLayoutProps {
  clubName?: string;
  children: React.ReactNode;
}

function AdminStepLayout({ clubName, children }: AdminStepLayoutProps) {
  return (
    <div className="flex min-h-[calc(100vh-134px)] w-full flex-col items-center justify-between">
      <div className="flex flex-col items-center gap-2 pt-10">
        <Image
          src="/admin/main_logo.png"
          alt="logo"
          width={329}
          height={119}
          className="h-auto w-[158px] object-contain md:w-[250px]"
        />
        <p className="text-sm text-[var(--color-darkmode-line)]">
          권한 | <span className="font-bold">{clubName} 동아리장</span>
        </p>
      </div>

      <div className="flex flex-col items-center gap-5 lg:gap-9">
        {children}
      </div>

      <div className="mt-4" />
    </div>
  );
}

export default AdminStepLayout;
