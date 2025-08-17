import * as React from 'react';
import cn from '@/shared/lib/utils';

type Variant = 'default' | 'error' | 'comment';

interface TextareaProps extends React.ComponentProps<'textarea'> {
  disabled?: boolean;
  variant?: Variant;
}

function Textarea({
  className,
  variant = 'default',
  disabled,
  ...props
}: TextareaProps) {
  const variantClass = {
    default: 'focus-visible:border-[#00E457] text-sm',
    error: 'border-[#FF383C] bg-[#FFF4F4] text-sm',
    comment: 'bg-[#F4F4F4] min-h-[71px] border-none p-4 text-base',
  };

  return (
    <textarea
      disabled={disabled}
      data-slot="textarea"
      className={cn(
        'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex min-h-[150px] w-full min-w-0 rounded-md border-2 bg-transparent px-3 py-2 transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        variantClass[variant],
        className,
      )}
      {...props}
    />
  );
}

export default Textarea;
