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
    });
  } catch (err) {
    return <ErrorBoundaryUi />;
  }

  const { rollingFirst, rollingSecond } = separateRollingData(data, 2);

  return (
    <div>
      <div className="flex flex-col items-center pt-10 pb-4 lg:pt-40 lg:pb-13">
        <p className="text-xl font-bold text-[#00E804] lg:text-[26px]">HOT!</p>
        <p className="text-xl font-bold text-[#4E5968] lg:text-[26px]">
          세종대학교의 인기 동아리
        </p>
      </div>
      <div className="group relative mb-10 flex w-full flex-col gap-2 overflow-hidden lg:mb-30">
        <ul
          className="flex min-w-max animate-[rolling_20s_linear_infinite] gap-2 group-hover:[animation-play-state:paused] lg:gap-4 lg:px-4 lg:py-2"
          style={{ animationDuration: '60s' }}
        >
          {rollingFirst.map((item) => (
            <li
              key={`${item.id}-row1-${item.groupIdx}`}
              className="min-w-[250px] lg:min-w-[320px]"
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
          className="ml-40 flex min-w-max animate-[rolling-reverse_20s_linear_infinite] gap-2 group-hover:[animation-play-state:paused] lg:gap-4 lg:px-4 lg:py-2"
          style={{ animationDuration: '60s' }}
        >
          {rollingSecond.map((item) => (
            <li
              key={`${item.id}-row1-${item.groupIdx}`}
              className="min-w-[250px] lg:min-w-[320px]"
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
