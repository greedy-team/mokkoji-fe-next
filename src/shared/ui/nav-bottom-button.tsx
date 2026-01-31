'use client';

import React, { MouseEventHandler } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavBottomButtonProps {
  label: string;
  navProps?: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onItemClick?: MouseEventHandler<HTMLAnchorElement>;
}

function NavBottomButton({
  label,
  navProps,
  href,
  icon: Icon,
  onItemClick,
}: NavBottomButtonProps) {
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
        'relative z-[70] flex h-full flex-1 flex-col items-center justify-center gap-[10px] text-[10px] font-medium no-underline transition-colors duration-500',
        navProps,
        active ? 'text-[#29D66B]' : 'text-[#A6A6A6]',
      )}
    >
      <Icon className="h-[19px] w-[21px]" />
      <span>{label}</span>
    </Link>
  );
}

export default NavBottomButton;
