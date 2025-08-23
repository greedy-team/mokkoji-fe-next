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
        'relative z-[70] mx-1 flex h-full items-center px-2 no-underline transition-colors duration-500 lg:mx-1 lg:px-2 lg:py-2',
        navProps,
        active
          ? 'ml-3 border-black font-extrabold lg:ml-0 lg:border-b-3'
          : 'border-b-2 border-transparent',
        'hover:border-black',
      )}
    >
      {label}
    </Link>
  );
}

export default NavButton;
