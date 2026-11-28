/* eslint-disable import/no-extraneous-dependencies */
import { HttpResponse } from 'msw';
import type { Pagination } from '@/shared/model/type';

export const apiUrl = (path: string) =>
  `${process.env.NEXT_PUBLIC_API_URL ?? ''}${path}`;

export const storageUrl = (path: string) => apiUrl(`/mock-storage/${path}`);

export interface MockBody<T> {
  data: T;
}

export interface MockError {
  code: number;
  message: string;
}

export type MockResponse<T> = MockBody<T> | MockError;

export const errorResponse = (status: number, message: string) =>
  HttpResponse.json<MockError>({ code: status, message }, { status });

export const isAuthorized = (request: Request) =>
  request.headers.get('Authorization')?.startsWith('Bearer ') ?? false;

export const pageParams = (request: Request) => {
  const params = new URL(request.url).searchParams;
  return {
    params,
    page: Number(params.get('page') ?? 1),
    size: Number(params.get('size') ?? 20),
  };
};

export function paginate<T>(items: T[], page: number, size: number) {
  const pagination: Pagination = {
    page,
    size,
    totalPages: Math.max(1, Math.ceil(items.length / size)),
    totalElements: items.length,
  };
  return {
    items: items.slice((page - 1) * size, page * size),
    pagination,
  };
}
