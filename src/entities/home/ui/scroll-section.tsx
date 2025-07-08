import { ClubType } from '@/shared/model/type';
import ScrollItem from './scroll-item';

interface HomeScrollSectionProps {
  data: ClubType[];
}

function HomeScrollSection({ data }: HomeScrollSectionProps) {
  const half = Math.ceil(data.length / 2);
  const firstRow = data.slice(0, half);
  const secondRow = data.slice(half);
  const repeatCount = 2;

  const rollingFirst = Array.from({ length: repeatCount }, (_, groupIdx) =>
    firstRow.map((item) => ({ ...item, groupIdx })),
  ).flat();

  const rollingSecond = Array.from({ length: repeatCount }, (_, groupIdx) =>
    secondRow.map((item) => ({ ...item, groupIdx })),
  ).flat();

  return (
    <div>
      <div className="flex flex-col items-center pt-40 pb-13">
        <p className="text-[26px] font-bold text-[#00E804]">HOT!</p>
        <p className="text-[26px] font-bold text-[#4E5968]">
          세종대학교의 인기 동아리
        </p>
      </div>
      <div className="group relative mb-30 flex w-full flex-col gap-2 overflow-hidden">
        <ul
          className="flex min-w-max animate-[rolling_20s_linear_infinite] gap-4 px-4 py-2 group-hover:[animation-play-state:paused]"
          style={{ animationDuration: '60s' }}
        >
          {rollingFirst.map((item) => (
            <li
              key={`${item.id}-row1-${item.groupIdx}`}
              className="min-w-[320px]"
            >
              <ScrollItem
                title={item.name}
                description={item.description}
                imgUrl={item.imageURL}
              />
            </li>
          ))}
        </ul>
        <ul
          className="ml-40 flex min-w-max animate-[rolling_20s_linear_infinite] gap-4 px-4 py-2 group-hover:[animation-play-state:paused]"
          style={{ animationDuration: '60s' }}
        >
          {rollingSecond.map((item) => (
            <li
              key={`${item.id}-row1-${item.groupIdx}`}
              className="min-w-[320px]"
            >
              <ScrollItem
                title={item.name}
                description={item.description}
                imgUrl={item.imageURL}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HomeScrollSection;
