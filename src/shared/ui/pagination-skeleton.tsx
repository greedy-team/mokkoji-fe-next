'use client';

import cn from '@/shared/lib/utils';

export default function PaginationSkeleton() {
  return (
    <div className="mt-8 flex gap-2">
      <div
        className={cn(
          'h-[40px] w-[40px] rounded-full border border-[#CFCFCF]',
          'animate-pulse bg-gray-200',
        )}
      />
      <div
        className={cn(
          'h-[40px] w-[40px] rounded-full border border-[#CFCFCF]',
          'animate-pulse bg-gray-200',
        )}
      />
    </div>
  );
}
