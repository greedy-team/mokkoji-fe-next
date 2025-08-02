'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import NavLink from '@/shared/ui/nav-Item';
import FadeEgde from '@/shared/ui/fade-edge';
import cn from '@/shared/lib/utils';

const movePx = 250;

interface CardSliderProps {
  data: {
    id: number;
    category: string;
    name: string;
    imageURL: string;
    description: string;
  }[];
}

function CardSilder({ data }: CardSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [data.length]);

  return (
    <div className="relative flex h-[300px] w-[50%] items-center justify-center overflow-hidden">
      <FadeEgde variant="left" />
      <FadeEgde variant="right" />
      <div className="relative flex items-center justify-center">
        {data.map((item, idx) => {
          const offset = idx - currentIndex;
          const isActive = offset === 0;
          const translateX = offset * movePx;

          return (
            <NavLink
              href={`/recruit/${item.id}`}
              key={item.id}
              isActive={isActive}
              translateX={translateX}
            >
              <div className="h-full w-full rounded-md bg-[#fefefe] p-4 shadow-xl transition-shadow duration-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.2)]">
                <div className="mb-4 flex items-center gap-4">
                  <Avatar className={`${isActive ? 'size-12' : 'size-10'}`}>
                    <AvatarImage src={item.imageURL} />
                    <AvatarFallback>{item.name}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#474747]">
                      {item.category}
                    </span>
                    <h1
                      className={cn(
                        isActive ? 'text-lg' : 'text-sm',
                        'font-bold transition-all duration-500',
                      )}
                    >
                      {item.name}
                    </h1>
                  </div>
                </div>
                <div
                  className={cn(
                    isActive ? 'text-sm' : 'text-xs',
                    'text-gray-600 transition-all duration-500',
                  )}
                >
                  {item.description}
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default CardSilder;
