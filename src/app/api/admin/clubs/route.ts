/* eslint-disable import/prefer-default-export */
import { NextRequest } from 'next/server';
import requestByAdmin from '@/shared/lib/admin-request';

export async function GET(request: NextRequest) {
  return requestByAdmin('admin/clubs', {
    searchParams: request.nextUrl.searchParams,
  });
}
