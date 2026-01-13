import { ClubRecruitments } from '@/views/club/model/type';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import RecruitHistoryCard from './recruit-history-card';

interface RecruitHistorySectionProps {
  clubId: number;
  recruitHistories: ClubRecruitments[];
  selectedRid: number;
}

function useRecruitHistoryVisibleCardCount() {
  const [cardCount, setCardCount] = useState(1);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;

      if (w >= 1024) setCardCount(3);
      else if (w >= 640) setCardCount(2);
      else setCardCount(1);
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return cardCount;
}

function RecruitHistorySection({
  clubId,
  recruitHistories,
  selectedRid,
}: RecruitHistorySectionProps) {
  const list = Array.isArray(recruitHistories) ? recruitHistories : [];
  const visibleCardCount = useRecruitHistoryVisibleCardCount();

  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(0, list.length - visibleCardCount);

  const canPrev = index > 0;
  const canNext = index < maxIndex;

  const itemWidth = `${100 / visibleCardCount}%`;

  return (
    <>
      <div className="mt-10 flex items-center gap-2 lg:gap-3">
        <img src="/pin.svg" alt="pin" className="w-8" />
        <span className="text-xl font-bold lg:text-2xl">전체 모집 공고</span>
      </div>

      <div className="mt-5 overflow-hidden pt-2">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(-${index * (100 / visibleCardCount)}%)`,
          }}
        >
          {list.map((r) => {
            const queryString = new URLSearchParams();
            queryString.set('rid', String(r.id));
            const href = `/club/${clubId}?${queryString.toString()}`;

            return (
              <div
                key={r.id}
                style={{ width: itemWidth }}
                className="shrink-0 px-2"
              >
                <Link href={href}>
                  <RecruitHistoryCard
                    recruitHistories={r}
                    isSelected={selectedRid === r.id}
                  />
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center gap-6 text-sm">
          <button
            onClick={() => setIndex((v) => Math.max(0, v - 1))}
            disabled={!canPrev}
            className="disabled:opacity-40"
          >
            &lt; 이전
          </button>

          <button
            onClick={() => setIndex((v) => Math.min(maxIndex, v + 1))}
            disabled={!canNext}
            className="disabled:opacity-40"
          >
            다음 &gt;
          </button>
        </div>
      </div>
    </>
  );
}

export default RecruitHistorySection;
