'use client';

import * as React from 'react';
import Link from 'next/link';

type HoverPrefetchLinkProps = Omit<
  React.ComponentProps<typeof Link>,
  'prefetch'
>;

function HoverPrefetchLink({
  onMouseEnter,
  onFocus,
  children,
  ...props
}: HoverPrefetchLinkProps) {
  const [shouldPrefetch, setShouldPrefetch] = React.useState(false);

  return (
    <Link
      {...props}
      prefetch={shouldPrefetch ? null : false}
      onMouseEnter={(event) => {
        setShouldPrefetch(true);
        onMouseEnter?.(event);
      }}
      onFocus={(event) => {
        setShouldPrefetch(true);
        onFocus?.(event);
      }}
    >
      {children}
    </Link>
  );
}

export default HoverPrefetchLink;
