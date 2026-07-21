/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import getCurrentUserRole from '@/shared/api/getCurrentUserRole';

export async function GET() {
  const result = await getCurrentUserRole();
  return NextResponse.json(result);
}
