import { FavoriteDateItem } from '@/views/favorite/model/type';
import getDaysLeftFromToday from '@/entities/favorite/util/get-days-left-from-today';

function remainingText(daysLeft: number) {
  if (daysLeft === 0) return '오늘';
  if (daysLeft === 1) return 'D-1';
  if (daysLeft === 2) return 'D-2';
  if (daysLeft === 3) return 'D-3';
  return '';
}

function RecruitDeadlineSoonList({ data }: { data: FavoriteDateItem[] }) {
  const soon = (data ?? [])
    .map((club) => ({
      clubName: club.clubName,
      daysLeft: getDaysLeftFromToday(club.recruitEnd),
    }))
    .filter((x) => x.daysLeft >= 0 && x.daysLeft <= 3)
    .sort(
      (a, b) => a.daysLeft - b.daysLeft || a.clubName.localeCompare(b.clubName),
    );

  return (
    <div className="flex flex-col space-y-2 rounded-xl bg-[#F8F8F8] p-6 text-xs font-semibold">
      {soon.length > 0 ? (
        <ul className="space-y-1">
          {soon.map(({ clubName, daysLeft }) => (
            <li key={`${clubName}-${daysLeft}`}>
              <span className="font-bold">{clubName} </span>
              모집 마감까지
              <span className="font-bold text-[#00E457]">
                {' '}
                {remainingText(daysLeft)}{' '}
              </span>
              {remainingText(daysLeft) === '오늘' ? '까지에요!' : '남았어요!'}
            </li>
          ))}
        </ul>
      ) : (
        <span>3일 이내 마감 예정 동아리가 없습니다.</span>
      )}
    </div>
  );
}

export default RecruitDeadlineSoonList;
