/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';
import serverApi from '@/shared/api/server-api';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const response = await serverApi.post('feedbacks', {
    json: body,
    throwHttpErrors: false,
  });

  const text = await response.text();
  if (!text) return new NextResponse(null, { status: response.status });
  return NextResponse.json(JSON.parse(text), { status: response.status });
}
