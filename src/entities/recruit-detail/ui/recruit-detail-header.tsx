import RecruitDetailHeaderControl from '@/features/club-detail/ui/club-detail-header-control';

interface RecruitDetailHeaderProps {
  title: string;
  category: string;
  instagram: string;
  clubId: number;
  isFavorite?: boolean;
}

function RecruitDetailHeader({
  title,
  category,
  instagram,
  clubId,
  isFavorite,
}: RecruitDetailHeaderProps) {
  return (
    <>
      <header className="w-full cursor-default border-b border-b-[#D6D6D6] pb-4">
        <div className="mb-4 flex flex-row items-center gap-5">
          <h1 className="text-xl font-bold">{title}</h1>
          <p className="text-xl font-bold text-[#9C9C9C]">{category} 동아리</p>
        </div>
      </header>
      <RecruitDetailHeaderControl
        instagram={instagram}
        clubId={clubId}
        isFavorite={isFavorite || false}
      />
    </>
  );
}

export default RecruitDetailHeader;
