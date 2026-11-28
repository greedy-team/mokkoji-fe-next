/* eslint-disable import/no-extraneous-dependencies, import/prefer-default-export */
import { http, HttpResponse } from 'msw';
import { storageUrl } from '../response';

// presigned URL 업로드·삭제 대상. 브라우저가 직접 호출하므로 browser worker가 처리한다
export const storageHandlers = [
  http.put(storageUrl('*'), () => new HttpResponse(null, { status: 200 })),
  http.delete(storageUrl('*'), () => new HttpResponse(null, { status: 204 })),
];
