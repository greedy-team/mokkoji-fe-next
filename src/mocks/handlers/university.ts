/* eslint-disable import/no-extraneous-dependencies, import/prefer-default-export */
import { http, HttpResponse } from 'msw';
import type { UniversitiesResponse } from '@/entities/university/model/type';
import { universities } from '../data';
import { apiUrl, type MockResponse } from '../response';

export const universityHandlers = [
  http.get<never, never, MockResponse<UniversitiesResponse>>(
    apiUrl('/universities'),
    () => HttpResponse.json({ data: { universities } }),
  ),
];
