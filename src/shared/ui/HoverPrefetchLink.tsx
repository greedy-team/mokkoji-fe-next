'use client';

import * as React from 'react';
import Link from 'next/link';

// 스쳐 지나가는 커서까지 프리페치하면 목록 하나 훑는 데 수십 건이 나간다.
// 이 시간만큼 머무른 hover만 클릭 의도로 본다.
const PREFETCH_INTENT_DELAY = 200;

type HoverPrefetchLinkProps = Omit<
  React.ComponentProps<typeof Link>,
  'prefetch'
>;

function HoverPrefetchLink({
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  children,
  ...props
}: HoverPrefetchLinkProps) {
  const [shouldPrefetch, setShouldPrefetch] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const schedulePrefetch = () => {
    if (shouldPrefetch || timerRef.current) return;
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      setShouldPrefetch(true);
    }, PREFETCH_INTENT_DELAY);
  };

  const cancelPrefetch = () => {
    if (!timerRef.current) return;
    clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  return (
    <Link
      {...props}
      prefetch={shouldPrefetch ? null : false}
      onMouseEnter={(event) => {
        schedulePrefetch();
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        cancelPrefetch();
        onMouseLeave?.(event);
      }}
      onFocus={(event) => {
        schedulePrefetch();
        onFocus?.(event);
      }}
      onBlur={(event) => {
        cancelPrefetch();
        onBlur?.(event);
      }}
    >
      {children}
    </Link>
  );
}

export default HoverPrefetchLink;
