'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from './button';

interface PaginationProps {
  page: number;
  size: number;
  total: number;
}

export default function Pagination({ page, size, total }: PaginationProps) {
  const totalPages = Math.ceil(total / size);

  return (
    <div className="mt-8 flex gap-2">
      {page > 1 ? (
        <Button
          asChild
          className="h-[40px] w-[40px] rounded-full border-1 border-[#CFCFCF] bg-white text-2xl"
        >
          <Link href={`?page=${page - 1}&size=${size}`} className="text-2xl">
            <Image
              src="/favorite/prev.svg"
              alt="prev"
              width={60}
              height={60}
              className="scale-125"
            />
          </Link>
        </Button>
      ) : (
        <Button
          disabled
          className="h-[40px] w-[40px] cursor-not-allowed rounded-full border-1 border-[#CFCFCF] bg-white text-2xl opacity-50"
        >
          <Image
            src="/favorite/prev.svg"
            alt="prev"
            width={60}
            height={60}
            className="scale-125"
          />
        </Button>
      )}

      {page < totalPages ? (
        <Button
          asChild
          className="h-[40px] w-[40px] rounded-full border border-[#CFCFCF] bg-white text-2xl"
        >
          <Link href={`?page=${page + 1}&size=${size}`} className="text-2xl">
            <Image
              src="/favorite/next.svg"
              alt="next"
              width={60}
              height={60}
              className="scale-125"
            />
          </Link>
        </Button>
      ) : (
        <Button
          disabled
          className="h-[40px] w-[40px] cursor-not-allowed rounded-full border border-[#CFCFCF] bg-white opacity-50"
        >
          <Image
            src="/favorite/next.svg"
            alt="next"
            width={60}
            height={60}
            className="scale-125"
          />
        </Button>
      )}
    </div>
  );
}
