'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavButtonProps {
  label: string;
  navProps?: string;
  href: string;
  isMobile?: boolean;
}

function NavButton({
  label,
  navProps,
  href,
  isMobile = false,
}: NavButtonProps) {
  const pathname = usePathname();
  const hrefPath = href.split('?')[0];

  const active = pathname.startsWith(hrefPath);

  return (
    <Link
      href={href}
      className={clsx(
        'flex items-center px-3 py-2 no-underline transition-colors duration-500 hover:border-b-2 hover:border-[#585858] lg:h-full lg:px-3.25 lg:hover:border-b-2',
        navProps,
        active && !isMobile && 'border-b-3 border-black lg:border-b-3',
        active && isMobile && 'mx-2 rounded-lg bg-gray-100',
      )}
    >
      {label}
    </Link>
  );
}

export default NavButton;
