'use client';

import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import NavLink from '@/shared/ui/nav-Item';
import FadeEgde from '@/shared/ui/fade-edge';
import cn from '@/shared/lib/utils';
import { Recruitment } from '@/widgets/recruit/model/type';

const movePx = 250;
const moblieMovePx = 100;

interface CardSliderProps {
  data: Recruitment[];
}

function CardSilder({ data }: CardSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }, 2000);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', checkMobile);
    };
  }, [data.length]);

  return (
    <div className="relative mt-10 flex h-[150px] w-full items-center justify-center overflow-hidden lg:mt-0 lg:h-[300px] lg:w-[50%]">
      <FadeEgde variant="left" />
      <FadeEgde variant="right" />
      <div className="relative flex items-center justify-center">
        {data.map((item, idx) => {
          const offset = idx - currentIndex + 1;
          const isActive = offset === 1;
          const cardWidth = isMobile ? moblieMovePx : movePx;
          const centerOffset = cardWidth / 2;

          const translateX = offset * cardWidth;
          const currentTranslateX = isMobile
            ? translateX - centerOffset
            : translateX - cardWidth;

          return (
            <NavLink
              href={`/recruit/${item.id}`}
              key={item.id}
              isActive={isActive}
              translateX={currentTranslateX}
              className="flex w-full justify-center"
            >
              <div className="h-[70%] w-[70%] rounded-md bg-[#fefefe] p-4 shadow-xl transition-shadow duration-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.2)] lg:h-full lg:w-full">
                <div className="mb-4 flex items-center gap-4">
                  <Avatar
                    className={`${isActive ? 'size-10 lg:size-12' : 'size-8 lg:size-10'}`}
                  >
                    <AvatarImage src={item.club.logo} />
                    <AvatarFallback>{item.club.name}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#474747] lg:text-xs">
                      {item.club.clubCategory}
                    </span>
                    <h1
                      className={cn(
                        isActive ? 'text-md lg:text-lg' : 'text-xs lg:text-sm',
                        'font-bold transition-all duration-500',
                      )}
                    >
                      {item.club.name}
                    </h1>
                  </div>
                </div>
                <div
                  className={cn(
                    isActive ? 'text-xs lg:text-sm' : 'text-[8px] lg:text-xs',
                    'line-clamp-2 overflow-hidden text-ellipsis text-gray-600 transition-all duration-500',
                  )}
                >
                  {item.club.description}
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
