import { ClubRecruitments } from '@/views/club/model/type';
import Link from 'next/link';
import { useState } from 'react';
import RecruitHistoryCard from './recruit-history-card';

interface RecruitHistorySectionProps {
  clubId: number;
  recruitHistories: ClubRecruitments[];
  selectedRid: number;
}

const PAGE_SIZE = 3;

function RecruitHistorySection({
  clubId,
  recruitHistories,
  selectedRid,
}: RecruitHistorySectionProps) {
  const list = Array.isArray(recruitHistories) ? recruitHistories : [];

  const [page, setPage] = useState(0);
  const start = page * PAGE_SIZE;
  const visible = list.slice(start, start + PAGE_SIZE);
  const canPrev = page > 0;
  const canNext = start + PAGE_SIZE < list.length;

  return (
    <>
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
