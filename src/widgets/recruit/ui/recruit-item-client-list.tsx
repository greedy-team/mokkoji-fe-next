'use client';

import { useId, useMemo, useRef, useState, useEffect } from 'react';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import Link from 'next/link';
import RecruitItem from '@/entities/recruit/ui/recruit-item';
import { Recruitment } from '../model/type';

interface RecruitItemClientListProps {
  recruitments: Recruitment[];
}

export default function RecruitItemClientList({
  recruitments,
}: RecruitItemClientListProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const id = useId();

  // ===== 반응형 컬럼 계산 =====
  const [columns, setColumns] = useState(3);
  const [cardHeight, setCardHeight] = useState(160);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setColumns(1); // 모바일 (sm 미만)
        setCardHeight(120);
      } else if (window.innerWidth < 1024) {
        setColumns(2); // 태블릿 (md~lg)
        setCardHeight(120);
      } else {
        setColumns(3); // 데스크탑
        setCardHeight(160);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const GAP_X = 16;
  const GAP_Y = 30;
  const ROW_PAD_Y = 8;
  const ROW_HEIGHT = cardHeight + ROW_PAD_Y * 2 + GAP_Y;

  const rowCount = useMemo(
    () => Math.ceil((recruitments?.length ?? 0) / columns),
    [recruitments, columns],
  );

  const rowVirtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => ROW_HEIGHT,
    overscan: 8,
    scrollMargin: 0,
  });

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        style={{
          height: rowVirtualizer.getTotalSize(),
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((vr) => {
          const startIndex = vr.index * columns;
          const rowItems = recruitments.slice(startIndex, startIndex + columns);

          return (
            <div
              key={vr.index}
              data-row-index={vr.index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${vr.start}px)`,
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                columnGap: GAP_X,
                rowGap: GAP_Y,
                padding: `${ROW_PAD_Y}px 8px`,
                boxSizing: 'border-box',
              }}
            >
              {rowItems.map((item) => (
                <Link
                  key={item.id}
                  href={`/recruit/${item.id}`}
                  style={{ display: 'block', height: cardHeight }}
                >
                  <div style={{ height: '100%' }}>
                    <RecruitItem
                      title={item.title}
                      name={item.club.name || ''}
                      startDate={item.recruitStart}
                      endDate={item.recruitEnd}
                      description={item.club.description}
                      isFavorite={item.isFavorite}
                      logo={item.club.logo}
                      clubId={String(item.club.id)}
                      status={item.status}
                    />
                  </div>
                </Link>
              ))}
              {rowItems.length < columns &&
                Array.from({ length: columns - rowItems.length }).map(() => (
                  <div key={id} style={{ height: cardHeight }} />
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
