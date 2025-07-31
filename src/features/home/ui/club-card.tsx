'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';

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
  const [randomData, setRandomData] = useState<CardSliderProps['data']>([]);

  useEffect(() => {
    const shuffled = [...data].sort(() => Math.random() - 0.5);
    const sliced = shuffled.slice(0, 10);
    setRandomData(sliced);
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % randomData.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [randomData.length]);

  return (
    <div className="relative flex h-[300px] w-[50%] items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-0 z-20 h-full w-20 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute top-0 right-0 z-20 h-full w-20 bg-gradient-to-l from-white to-transparent" />
      <div className="relative flex items-center justify-center">
        {randomData.map((item, idx) => {
          const offset = idx - currentIndex;
          const isActive = offset === 0;
          const translateX = offset * movePx;

          return (
            <Link
              href={`/recruit/${item.id}`}
              key={item.id}
              className={`absolute transition-all duration-500 ease-in-out ${
                isActive
                  ? 'z-10 scale-100 opacity-100'
                  : 'z-0 scale-90 opacity-40'
              }`}
              style={{
                transform: `translateX(${translateX}px)`,
                width: isActive ? 320 : 200,
                height: isActive ? 180 : 140,
              }}
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
                      className={`${isActive ? 'text-lg' : 'text-sm'} font-bold transition-all duration-500`}
                    >
                      {item.name}
                    </h1>
                  </div>
                </div>
                <div
                  className={`${isActive ? 'text-sm' : 'text-xs'} text-gray-600 transition-all duration-500`}
                >
                  {item.description}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default CardSilder;
