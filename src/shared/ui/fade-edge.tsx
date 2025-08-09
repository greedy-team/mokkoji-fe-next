import * as React from 'react';
import cn from '@/shared/lib/utils';

type Variant = 'top' | 'right' | 'bottom' | 'left';

interface FadeEgdeProps {
  variant: Variant;
}

function FadeEgde({ variant = 'left' }: FadeEgdeProps) {
  const variantClass = {
    top: 'top-0 left-0 z-20 h-6 lg:h-20 w-full bg-gradient-to-t from-transparent to-white',
    right:
      'top-0 right-0 z-20 h-full w-6 lg:w-20 bg-gradient-to-l from-white to-transparent',
    bottom:
      'bottom-0 left-0 z-20 h-6 lg:h-20 w-full bg-gradient-to-b from-transparent to-white',
    left: 'top-0 left-0 z-20 h-full w-6 lg:w-20 bg-gradient-to-r from-white to-transparent',
  };

  return (
    <div
      className={cn('pointer-events-none absolute', variantClass[variant])}
    />
  );
}

export default FadeEgde;
