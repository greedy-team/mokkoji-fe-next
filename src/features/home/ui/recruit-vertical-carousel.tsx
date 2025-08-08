'use client';

import { useEffect, useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import FadeEgde from '@/shared/ui/fade-edge';
import cn from '@/shared/lib/utils';
import isRecruiting from '../util/isRecruiting';

interface CardSliderProps {
  data: {
    id: number;
    name: string;
    logo: string;
    description: string;
    recruitStartDate: string;
    recruitEndDate: string;
  }[];
}

const radius = 260;
const visibleCount = 10;
const angleStep = 360 / visibleCount;

function RecruitVerticalCarousel({ data }: CardSliderProps) {
  const [scrollAngle, setScrollAngle] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const targetAngleRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollTop = window.scrollY;
      targetAngleRef.current = scrollTop * 0.2;
    };

    const animate = () => {
      setScrollAngle((prev) => {
        const next = prev + (targetAngleRef.current - prev) * 0.08;
        return next;
      });
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    animate();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafRef.current!);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[250px] w-full overflow-hidden perspective-[1200px] sm:h-[280px] lg:h-[300px] lg:w-[50%]"
    >
      <FadeEgde variant="top" />
      <FadeEgde variant="bottom" />
      <div
        className="relative h-full w-full"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(-${scrollAngle}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {data.map((item, idx) => {
          const rotateX = idx * angleStep;
          const relativeAngle = (rotateX - scrollAngle + 360) % 360;
          const isVisible = relativeAngle <= 90 || relativeAngle >= 270;
          const status = isRecruiting(
            item.recruitStartDate,
            item.recruitEndDate,
          );

          return (
            <div
              key={item.id}
              className={cn(
                isVisible ? 'opacity-100' : 'opacity-0',
                'absolute top-1/2 left-0 w-full -translate-y-1/2 transform-3d',
              )}
              style={{
                transform: `rotateX(${rotateX}deg) translateZ(${radius}px)`,
              }}
            >
              <div className="mx-auto h-[140px] w-[280px] rounded-lg bg-white p-3 shadow-[0_0_8px_rgba(0,0,0,0.2)] sm:h-[160px] sm:w-[300px] sm:p-4">
                <div className="mb-3 flex items-center justify-between gap-3 sm:mb-4 sm:gap-4">
                  <Avatar className="size-8 sm:size-10">
                    <AvatarImage src={item.logo} />
                    <AvatarFallback>{item.name}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-1 flex-col">
                    <span className="text-[8px] font-bold text-[#474747]">
                      모집 기간 • {item.recruitStartDate}~{item.recruitEndDate}
                    </span>
                    <h1 className="text-xs font-bold sm:text-sm">
                      {item.name}
                    </h1>
                  </div>
                  <div
                    className={cn(
                      status === '모집 중'
                        ? 'bg-[#00E457] text-white'
                        : 'bg-[#E9E7E7] text-[#9C9C9C]',
                      'rounded-full px-2 py-1 text-[8px] sm:text-[10px]',
                    )}
                  >
                    {status}
                  </div>
                </div>
                <p className="p-1 text-xs text-gray-600">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecruitVerticalCarousel;
