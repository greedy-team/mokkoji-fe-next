'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface AffiliationNavButtonProps {
  label: string;
  navProps?: string;
  href: string;
  value?: string;
}

function AffiliationNavButton({
  label,
  navProps,
  href,
  value,
}: AffiliationNavButtonProps) {
  const searchParams = useSearchParams();

  const active = searchParams.get('affiliation') === value;

  return (
    <Link
      href={href}
      className={clsx(
        'flex h-full items-center px-3.25 no-underline transition-colors duration-500 hover:border-b-2 hover:border-[#585858]',
        navProps,
        active && 'border-b-3 border-black',
      )}
    >
      {label}
    </Link>
  );
}

export default AffiliationNavButton;
