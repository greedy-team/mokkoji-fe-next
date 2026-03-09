function getKeyByValue(
  record: Record<string, string>,
  targetValue: string,
): string | undefined {
  return Object.keys(record).find((key) => record[key].includes(targetValue));
}

export default getKeyByValue;
