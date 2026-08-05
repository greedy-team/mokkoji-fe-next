import { toApiCode } from '@/shared/lib/urlCodeConverter';

export const universityDisplayName: Record<string, string> = {
  SEJONG: '세종대학교',
  KONKUK: '건국대학교',
};

export function getUniversityName(code: string): string {
  return universityDisplayName[toApiCode(code)] ?? code;
}

export function isValidUniversityCode(code: string): boolean {
  return toApiCode(code) in universityDisplayName;
}
