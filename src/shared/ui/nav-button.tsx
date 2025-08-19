'use client';

import React, { MouseEventHandler } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavButtonProps {
  label: string;
  navProps?: string;
  href: string;
  onItemClick?: MouseEventHandler<HTMLAnchorElement>;
}

function NavButton({ label, navProps, href, onItemClick }: NavButtonProps) {
  const pathname = usePathname();
  const hrefPath = href.split('?')[0];

  const pathnameFirstSegment = pathname.split('/')[1] || '';
  const hrefFirstSegment = hrefPath.split('/')[1] || '';

  const active = pathnameFirstSegment === hrefFirstSegment;

  return (
    <Link
      href={href}
      onClick={onItemClick}
      className={clsx(
        'flex items-center px-3 no-underline transition-colors duration-500 hover:border-b-2 hover:border-[#585858] lg:h-full lg:px-3.25 lg:py-2 lg:hover:border-b-2',
        navProps,
        active &&
          'ml-2 w-fit border-b-2 font-extrabold lg:border-b-3 lg:border-black',
      )}
    >
      {label}
    </Link>
  );
}

export default NavButton;
