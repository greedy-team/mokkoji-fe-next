import { ClubRecruitments } from '@/views/club/model/type';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import RecruitHistoryCard from './recruit-history-card';

interface RecruitHistorySectionProps {
  clubId: number;
  recruitHistories: ClubRecruitments[];
  selectedRid: number;
}

function usePageSize() {
  const [pageSize, setPageSize] = useState(1);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;

      if (w >= 1024) setPageSize(3);
      else if (w >= 640) setPageSize(2);
      else setPageSize(1);
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return pageSize;
}

function RecruitHistorySection({
  clubId,
  recruitHistories,
  selectedRid,
}: RecruitHistorySectionProps) {
  const list = Array.isArray(recruitHistories) ? recruitHistories : [];
  const pageSize = usePageSize();

  const [page, setPage] = useState(0);
  const start = page * pageSize;
  const visible = list.slice(start, start + pageSize);
  const canPrev = page > 0;
  const canNext = start + pageSize < list.length;

  return (
    <>
      <div className="mt-10 flex items-center gap-3">
        <img src="/pin.svg" alt="pin" />
        <span className="text-2xl font-bold">전체 모집 공고</span>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((r) => {
          const qs = new URLSearchParams();
          qs.set('rid', String(r.id));
          const href = `/club/${clubId}?${qs.toString()}`;

          return (
            <Link key={r.id} href={href}>
              <RecruitHistoryCard
                recruitHistories={r}
                isSelected={selectedRid === r.id}
              />
            </Link>
          );
        })}
      </div>

      <div className="mt-6 flex justify-center gap-6 text-sm">
        <button
          onClick={() => setPage(page - 1)}
          disabled={!canPrev}
          className="disabled:opacity-40"
        >
          &lt; 이전
        </button>

        <button
          onClick={() => setPage(page + 1)}
          disabled={!canNext}
          className="disabled:opacity-40"
        >
          다음 &gt;
        </button>
      </div>
    </>
  );
}

export default RecruitHistorySection;
