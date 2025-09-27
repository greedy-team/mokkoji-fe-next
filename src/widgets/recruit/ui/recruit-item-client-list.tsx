'use client';

import { useId, useMemo, useRef } from 'react';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import Link from 'next/link';
import RecruitItem from '@/entities/recruit/ui/recruit-item';
import { Session } from 'next-auth';

interface RecruitItemClientListProps {
  recruitments: any[];
  session?: Session;
}

export default function RecruitItemClientList({
  recruitments,
  session,
}: RecruitItemClientListProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const id = useId();

  // ===== 레이아웃 상수 =====
  const COLUMNS = 3 as const;
  const CARD_HEIGHT = 150; // 카드 고정 높이(px) - 필요시 조정
  const GAP_X = 16; // 열(가로) 간격
  const GAP_Y = 30; // 행(세로) 간격
  const ROW_PAD_Y = 8; // 행 상/하 패딩
  // rowHeight = 카드높이 + 상/하 패딩 + (행 간격)
  const ROW_HEIGHT = CARD_HEIGHT + ROW_PAD_Y * 2 + GAP_Y;

  const rowCount = useMemo(
    () => Math.ceil(recruitments.length / COLUMNS),
    [recruitments.length],
  );

  const rowVirtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => ROW_HEIGHT,
    overscan: 8,
    scrollMargin: 0,
  });

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
      }}
    >
      <div
        style={{
          height: rowVirtualizer.getTotalSize(),
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((vr) => {
          const startIndex = vr.index * COLUMNS;
          const rowItems = recruitments.slice(startIndex, startIndex + COLUMNS);

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
                gridTemplateColumns: `repeat(${COLUMNS}, minmax(0, 1fr))`,
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
                  style={{ display: 'block', height: CARD_HEIGHT }}
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
                      session={session}
                    />
                  </div>
                </Link>
              ))}

              {/* 마지막 행 채우기(3개 미만일 때 높이 유지) */}
              {rowItems.length < COLUMNS &&
                Array.from({ length: COLUMNS - rowItems.length }).map(() => (
                  <div
                    key={`${id}-${vr.index}`}
                    style={{ height: CARD_HEIGHT }}
                  />
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
