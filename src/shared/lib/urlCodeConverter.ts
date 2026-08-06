/**
 * URL에 노출되는 코드는 항상 소문자, API/enum 코드는 항상 대문자다.
 * 호출부에서 toLowerCase()/toUpperCase()를 직접 쓰지 말고 이 두 함수만 거친다.
 */

export function toUrlCode(apiCode: string): string {
  return apiCode.toLowerCase();
}

export function toApiCode(urlCode: string): string {
  return urlCode.toUpperCase();
}
