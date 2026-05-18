/* eslint-disable import/no-extraneous-dependencies, import/prefer-default-export */
import { http, HttpResponse } from 'msw';

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? '';

export const handlers = [
  http.get(`${baseUrl}/health`, () =>
    HttpResponse.json({ status: 'ok', mocked: true }),
  ),
];
