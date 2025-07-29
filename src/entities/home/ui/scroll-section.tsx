import getRecruitList from '@/widgets/recruit/api/getRecruitList';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import ScrollItem from './scroll-item';
import separateRollingData from '../lib/utils';

async function HomeScrollSection() {
  let data;
  try {
    data = await getRecruitList({
      page: 1,
      size: 14,
      keyword: '',
      category: undefined,
      affiliation: undefined,
      recruitStatus: undefined,
    });
  } catch (err) {
    return <ErrorBoundaryUi />;
  }

  const { rollingFirst, rollingSecond } = separateRollingData(data, 2);

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
                id={item.id}
              />
            </li>
          ))}
        </ul>
        <ul
          className="ml-40 flex min-w-max animate-[rolling-reverse_20s_linear_infinite] gap-4 px-4 py-2 group-hover:[animation-play-state:paused]"
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
                id={item.id}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HomeScrollSection;
