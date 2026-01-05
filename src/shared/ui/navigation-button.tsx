import Image from 'next/image';
import cn from '@/shared/lib/utils';

interface NavigationButtonProps {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export function PrevButton({
  onClick,
  className,
  children,
}: NavigationButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#1A1A1A] text-sm',
        children ? 'h-fit w-fit p-5' : 'size-10',
        className,
      )}
    >
      <Image src="/prev.svg" alt="prev" width={7} height={12} />
      {children}
    </button>
  );
}

export function NextButton({
  onClick,
  className,
  children,
}: NavigationButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#1A1A1A] text-sm',
        children ? 'h-fit w-fit p-5' : 'size-10',
        className,
      )}
    >
      {children}
      <Image src="/next.svg" alt="next" width={7} height={12} />
    </button>
  );
}
