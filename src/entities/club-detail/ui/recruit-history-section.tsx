import { ClubRecruitments } from '@/views/club/model/type';
import Link from 'next/link';
import RecruitHistoryCard from './recruit-history-card';

interface RecruitHistorySectionProps {
  clubId: number;
  recruitHistories: ClubRecruitments[];
  selectedRid: number;
}

function RecruitHistorySection({
  clubId,
  recruitHistories,
  selectedRid,
}: RecruitHistorySectionProps) {
  const list = Array.isArray(recruitHistories)
    ? recruitHistories.slice(0, 3)
    : [];

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((r) => {
        const qs = new URLSearchParams();
        qs.set('rid', String(r.id));
        const href = `/club/${clubId}?${qs.toString()}`;

        return (
          <Link key={r.id} href={href} scroll={false}>
            <RecruitHistoryCard
              recruitHistories={r}
              isSelected={selectedRid === r.id}
            />
          </Link>
        );
      })}
    </div>
  );
}

export default RecruitHistorySection;
