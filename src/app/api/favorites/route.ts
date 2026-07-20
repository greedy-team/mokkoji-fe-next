/* eslint-disable import/prefer-default-export */
import { NextRequest } from 'next/server';
import requestByUser from '@/shared/lib/user-request';

export async function GET(request: NextRequest) {
  return requestByUser('favorites', {
    searchParams: request.nextUrl.searchParams,
  });
}
