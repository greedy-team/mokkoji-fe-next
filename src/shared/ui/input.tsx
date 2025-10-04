import * as React from 'react';
import cn from '@/shared/lib/utils';

type Variant = 'default' | 'error';

interface InputProps extends React.ComponentProps<'input'> {
  variant?: Variant;
}

function Input({
  className,
  type = 'text',
  variant = 'default',
  ...props
}: InputProps) {
  const variantClass = {
    default: 'focus-visible:border-[#00E457]',
    error: 'border-[#FF383C] bg-[#FFF4F4]',
  };

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'rounded-md border-1 px-3 py-1',
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 bg-transparent text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        variantClass[variant],
        className,
      )}
      {...props}
    />
  );
}

export default Input;
