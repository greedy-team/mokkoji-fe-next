import { ClubType } from '@/shared/model/type';

function separateRollingData(data: ClubType[], repeatCount: number = 2) {
  const half = Math.ceil(data.length / 2);
  const firstRow = data.slice(0, half);
  const secondRow = data.slice(half);

  const rollingFirst = Array.from({ length: repeatCount }, (_, groupIdx) =>
    firstRow.map((item) => ({ ...item, groupIdx })),
  ).flat();

  const rollingSecond = Array.from({ length: repeatCount }, (_, groupIdx) =>
    secondRow.map((item) => ({ ...item, groupIdx })),
  ).flat();

  return { rollingFirst, rollingSecond };
}

export default separateRollingData;
