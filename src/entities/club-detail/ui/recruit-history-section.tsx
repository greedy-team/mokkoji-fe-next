import { ClubRecruitments } from '@/views/club/model/type';
import RecruitHistoryCard from './recruit-history-card';

interface RecruitHistorySectionProps {
  recruitHistories: ClubRecruitments[];
}

function RecruitHistorySection({
  recruitHistories,
}: RecruitHistorySectionProps) {
  const list = Array.isArray(recruitHistories)
    ? recruitHistories.slice(0, 3)
    : [];

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((r) => (
        <RecruitHistoryCard key={r.id} recruitHistories={r} />
      ))}
    </div>
  );
}

export default RecruitHistorySection;
