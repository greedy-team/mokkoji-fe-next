function getKeyByValue(
  obj: Record<string, string>,
  value: string,
): string | undefined {
  return Object.keys(obj).find((key) => obj[key].includes(value));
}

export default getKeyByValue;
