'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

interface NavButtonProps {
  label: string;
  navProps?: string;
  active?: boolean;
  href: string;
}

export default function NavButton({
  label,
  active = false,
  navProps,
  href,
}: NavButtonProps) {
  return (
    <Link
      href={href}
      className={clsx(
        'flex h-full items-center px-3.25 no-underline',
        navProps,
        active ? 'border-b-2 border-black' : '',
      )}
    >
      {label}
    </Link>
  );
}
