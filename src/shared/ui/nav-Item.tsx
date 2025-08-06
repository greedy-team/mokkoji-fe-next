import * as React from 'react';
import cn from '@/shared/lib/utils';
import Link from 'next/link';

interface NavLinkProps extends React.ComponentProps<typeof Link> {
  isActive?: boolean;
  translateX?: number;
  children: React.ReactNode;
}

function NavLink({ href, isActive, translateX, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'absolute transition-all duration-500 ease-in-out',
        isActive
          ? 'z-10 h-[180px] w-80 scale-100 opacity-100'
          : 'z-0 h-[140px] w-50 scale-90 opacity-40',
      )}
      style={{ transform: `translateX(${translateX}px)` }}
    >
      {children}
    </Link>
  );
}

export default NavLink;
