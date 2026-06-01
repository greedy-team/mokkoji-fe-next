export const universityDisplayName: Record<string, string> = {
  SEJONG: '세종대',
  KONKUK: '건국대',
};

export function getUniversityName(code: string): string {
  return universityDisplayName[code.toUpperCase()] ?? code;
}

export function urlCodeToApiCode(urlCode: string): string {
  return urlCode.toUpperCase();
}
