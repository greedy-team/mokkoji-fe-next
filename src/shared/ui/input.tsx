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
    default: 'border-transparent focus:border-[#00E457]',
    error: 'border-[#FF383C]',
  };

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'rounded-[10px] border-2 bg-[#D9D9D920] p-[14px] indent-1.5 text-sm',
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex w-full min-w-0 outline-none file:inline-flex file:h-7 file:border-0 file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'transition-colors duration-200 ease-in-out',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        variantClass[variant],
        className,
      )}
      {...props}
    />
  );
}

export default Input;
