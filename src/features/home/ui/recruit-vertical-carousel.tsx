'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import FadeEdge from '@/shared/ui/fade-edge';
import cn from '@/shared/lib/utils';
import { ClubType } from '@/shared/model/type';
import isRecruiting from '../util/isRecruiting';

interface CardSliderProps {
  clubs: ClubType[];
}

const radius = 260;
const visibleCount = 10;
const angleStep = 360 / visibleCount;

function RecruitVerticalCarousel({ clubs }: CardSliderProps) {
  const [scrollAngle, setScrollAngle] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const targetAngleRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [isMobile, setIsMobile] = useState(false);

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

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll, { passive: true });
    animate();

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafRef.current!);
    };
  }, []);

  const currentRadius = isMobile ? 180 : radius;

  return (
    <div
      ref={containerRef}
      className="relative h-[50%] w-full cursor-pointer overflow-hidden perspective-[10000px] lg:h-[300px] lg:w-[50%]"
    >
      <FadeEdge variant="top" />
      <FadeEdge variant="bottom" />
      <div
        className="relative h-full w-full"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(-${scrollAngle}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {clubs.map((item, idx) => {
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
                transform: `rotateX(${rotateX}deg) translateZ(${currentRadius}px)`,
              }}
            >
              <Link href={`/club/${item.id}`}>
                <div className="mx-auto h-[104px] w-[195px] rounded-lg bg-white p-4 shadow-[0_0_8px_rgba(0,0,0,0.2)] lg:h-[160px] lg:w-[300px]">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <Avatar className="size-8 lg:size-10">
                      <AvatarImage src={item.logo} loading="lazy" />
                      <AvatarFallback>{item.name}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-1 flex-col">
                      <span className="text-[6px] font-bold text-[#474747] lg:text-[8px]">
                        모집 기간 • {item.recruitStartDate}~
                        {item.recruitEndDate}
                      </span>
                      <h1 className="text-xs font-bold lg:text-sm">
                        {item.name}
                      </h1>
                    </div>
                    <div
                      className={cn(
                        status === '모집 중'
                          ? 'bg-[#00E457] text-white'
                          : 'bg-[#E9E7E7] text-[#9C9C9C]',
                        'rounded-full px-2 py-1 text-[6px] lg:text-[10px]',
                      )}
                    >
                      {status}
                    </div>
                  </div>
                  <p className="line-clamp-1 h-[20px] overflow-hidden p-1 text-[10px] text-ellipsis text-gray-600 lg:text-xs">
                    {item.description}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecruitVerticalCarousel;
