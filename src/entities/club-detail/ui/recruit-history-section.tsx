import RecruitHistoryCard from './recruit-history-card';

interface RecruitHistorySectionProps {
  title: string;
}

function RecruitHistorySection({ title }: RecruitHistorySectionProps) {
  return <RecruitHistoryCard title={title} />;
}

export default RecruitHistorySection;
