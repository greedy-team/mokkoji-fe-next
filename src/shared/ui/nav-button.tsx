import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavButtonProps {
  label: string;
  navProps?: string;
  href: string;
}

export default function NavButton({ label, navProps, href }: NavButtonProps) {
  const pathname = usePathname();
  const active = pathname.startsWith(href);

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
