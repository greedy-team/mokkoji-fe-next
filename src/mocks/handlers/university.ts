/* eslint-disable import/no-extraneous-dependencies, import/prefer-default-export */
import { http, HttpResponse } from 'msw';
import { universities } from '../data';

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? '';

const url = (path: string) => `${baseUrl}${path}`;

export const universityHandlers = [
  http.get(url('/universities'), () =>
    HttpResponse.json({ data: { universities } }),
  ),
];
