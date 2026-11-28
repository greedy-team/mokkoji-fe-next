import { canBeChoseong, disassemble, getChoseong } from 'es-hangul';

const MAX_RESULT_COUNT = 10;

function normalize(value: string) {
  return value.replace(/\s/g, '').toLowerCase();
}

function filterClubNames<T extends { name: string }>(
  clubs: T[],
  keyword: string,
): T[] {
  const normalizedKeyword = normalize(keyword);
  if (!normalizedKeyword) return [];

  const isChoseongOnly = [...normalizedKeyword].every(canBeChoseong);
  const disassembledKeyword = disassemble(normalizedKeyword);

  return clubs
    .filter(({ name }) => {
      const normalizedName = normalize(name);
      // 초성만 입력하면 받침까지 매칭되지 않도록 초성끼리만 비교한다
      if (isChoseongOnly) {
        return getChoseong(normalizedName).includes(normalizedKeyword);
      }
      return disassemble(normalizedName).includes(disassembledKeyword);
    })
    .slice(0, MAX_RESULT_COUNT);
}

export default filterClubNames;
