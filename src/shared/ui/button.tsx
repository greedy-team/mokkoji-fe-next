import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import cn from '@/shared/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:bg-[#D9D9D920] disabled:text-white [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        link: 'flex cursor-pointer items-center gap-1.5 rounded-full bg-gradient-to-r from-[#00E804] to-[#33E3D0] text-xs lg:text-base font-semibold text-white shadow-[0_0_8px_rgba(0,0,0,0.2)] transition hover:brightness-105',
        disabled: 'rounded-md py-5 bg-[#D5D5D5] text-white text-base mt-6',
        submit:
          'rounded-[4px] px-4 lg:px-[70px] py-[10px] lg:py-[14px] bg-[var(--color-blackmode-tag)] text-black text-xs lg:text-base font-bold bg-[#1AE166] hover:bg-[#00c94c] transition-colors duration-200',
        next: 'rounded-md py-3.5 bg-[var(--color-darkmode-tag)] text-black text-base font-bold mt-6 hover:bg-[#FFFFFF80] transition-colors duration-200 disabled:bg-[#FFFFFF80] disabled:text-black',
        optionsSelected:
          'rounded-full py-3 w-fit px-8 text-sm border-2 text-black font-semibold border-primary bg-[#FFFFFF] transition-colors duration-300',
        options:
          'rounded-full py-3 w-fit px-8 text-sm border-2 font-semibold bg-[#262726] border-[#262726] hover:border-[#888888] hover:bg-[#f6f6f6] hover:text-black transition-colors duration-300',
        none: '',
        optionsBlackGround:
          'rounded-full py-4 px-5 w-fit font-bold text-sm text-[#A9A9A9] bg-[#2C2E2C] hover:bg-[#1AE166] hover:text-black transition-colors duration-300 lg:py-5 lg:px-6 lg:text-base',
        dropdownItem:
          'w-full justify-start gap-3 rounded-none px-4 py-2.5 text-sm text-black hover:bg-[#1AE166] hover:text-white transition-colors',
        dropdownItemDanger:
          'w-full justify-start gap-3 rounded-none px-4 py-2.5 text-sm text-black hover:bg-[#1AE166] hover:text-red-500 transition-colors',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-full px-2 lg:px-6 py-2 lg:py-6 has-[>svg]:px-4',
        navi: 'rounded-full px-4 lg:px-5 py-[14px] lg:py-2 has-[>svg]:px-4',
        icon: 'size-9',
        none: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
