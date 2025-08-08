'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavButtonProps {
  label: string;
  navProps?: string;
  href: string;
}

function NavButton({ label, navProps, href }: NavButtonProps) {
  const pathname = usePathname();
  const hrefPath = href.split('?')[0];

  const active = pathname.startsWith(hrefPath);

  return (
    <Link
      href={href}
      className={clsx(
        'flex items-center px-3 no-underline transition-colors duration-500 hover:border-b-2 hover:border-[#585858] lg:h-full lg:px-3.25 lg:py-2 lg:hover:border-b-2',
        navProps,
        active && 'border-b-3 border-black lg:border-b-3',
      )}
    >
      {label}
    </Link>
  );
}

export default NavButton;
