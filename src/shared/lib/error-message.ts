import { HTTPError } from 'ky';

function ErrorMessage(error: Error) {
  if (error instanceof HTTPError) {
    switch (error.response.status) {
      case 400:
        return '잘못된 요청입니다.';
      case 401:
        return '로그인이 필요합니다.';
      case 403:
        return '권한이 없습니다.';
      case 404:
        return '요청한 자원을 찾을 수 없습니다.';
      case 409:
        return '이미 등록된 동아리입니다.';
      case 500:
        return '서버 오류가 발생했습니다. 다시 시도해주세요.';
      default:
        return '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.';
    }
  }
  return '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.';
}

interface ErrorHandlerArray {
  status: number;
  message: string;
}

function ErrorHandler(error: Error, customErrArray?: ErrorHandlerArray[]) {
  if (error instanceof HTTPError) {
    if (customErrArray) {
      const customMessage = customErrArray.find(
        (item) => item.status === error.response.status,
      );
      return {
        ok: false,
        message: customMessage?.message || ErrorMessage(error),
        data: undefined,
      };
    }
    return { ok: false, message: ErrorMessage(error), data: undefined };
  }
  return {
    ok: false,
    message: '알 수 없는 오류가 발생했습니다.',
    data: undefined,
  };
}

export default ErrorHandler;
