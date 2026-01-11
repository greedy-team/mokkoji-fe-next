'use client';

import { useRef, useState, useEffect } from 'react';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import Link from 'next/link';
import ClubItem from '@/entities/club/ui/club-item';
import { Recruitment } from '../model/type';

interface ClubItemClientListProps {
  recruitments: Recruitment[];
  initialColumns?: number;
  initialCardHeight?: number;
}

function getColumnsAndHeight(width: number) {
  if (width < 640) return { columns: 1, cardHeight: 140 };
  if (width < 1024) return { columns: 2, cardHeight: 140 };
  return { columns: 3, cardHeight: 150 };
}

function ClubItemClientList({
  recruitments,
  initialColumns = 3,
  initialCardHeight = 150,
}: ClubItemClientListProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [columns, setColumns] = useState(initialColumns);
  const [cardHeight, setCardHeight] = useState(initialCardHeight);

  useEffect(() => {
    function handleResize() {
      const { columns: newColumns, cardHeight: newHeight } =
        getColumnsAndHeight(window.innerWidth);
      setColumns(newColumns);
      setCardHeight(newHeight);
    }

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const GAP_Y = 20;
  const rowCount = Math.ceil((recruitments?.length ?? 0) / columns);

  const rowVirtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => cardHeight + GAP_Y,
    overscan: 6,
    scrollMargin: 0,
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{
        height: rowVirtualizer.getTotalSize(),
      }}
    >
      {rowVirtualizer.getVirtualItems().map((vr) => {
        const startIndex = vr.index * columns;
        const rowItems = recruitments.slice(startIndex, startIndex + columns);

        return (
          <div
            key={vr.index}
            data-row-index={vr.index}
            className="absolute top-0 left-0 box-border grid w-full"
            style={{
              transform: `translateY(${vr.start}px)`,
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
              marginBottom: `${GAP_Y}px`,
              columnGap: '20px',
            }}
          >
            {rowItems.map((item) => (
              <Link key={item.id} href={`/club/${item.club.id}`}>
                <ClubItem
                  title={item.title}
                  name={item.club.name || ''}
                  startDate={item.recruitStart}
                  endDate={item.recruitEnd}
                  description={item.club.description}
                  isFavorite={item.isFavorite}
                  logo={item.club.logo}
                  clubId={String(item.club.id)}
                  status={item.status}
                  height={cardHeight}
                />
              </Link>
            ))}
            {rowItems.length < columns &&
              Array.from({ length: columns - rowItems.length }).map(() => (
                <div
                  key={crypto.randomUUID()}
                  style={{ height: `${cardHeight}px` }}
                />
              ))}
          </div>
        );
      })}
    </div>
  );
}

export default ClubItemClientList;
