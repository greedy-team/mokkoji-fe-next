import Image from 'next/image';
import cn from '@/shared/lib/utils';

interface NavigationButtonProps {
  onClick?: () => void;
  className?: string;
}

export function PrevButton({ onClick, className }: NavigationButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#1A1A1A]',
        className,
      )}
    >
      <Image src="/prev.svg" alt="prev" width={8} height={12} />
    </button>
  );
}

export function NextButton({ onClick, className }: NavigationButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#1A1A1A]',
        className,
      )}
    >
      <Image src="/next.svg" alt="next" width={8} height={12} />
    </button>
  );
}
