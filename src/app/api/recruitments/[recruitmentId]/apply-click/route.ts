/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';
import serverApi from '@/shared/api/server-api';

// 비로그인 사용자의 클릭도 집계 대상이므로 requestByUser(세션 없으면 401)를 쓰지 않고
// 인증 없이 그대로 백엔드에 전달한다. 백엔드도 이 엔드포인트만 인증을 요구하지 않는다.
export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ recruitmentId: string }> },
) {
  const { recruitmentId } = await params;

  const response = await serverApi.post(
    `recruitments/${recruitmentId}/apply-click`,
    { throwHttpErrors: false },
  );

  const text = await response.text();
  if (!text) return new NextResponse(null, { status: response.status });
  return NextResponse.json(JSON.parse(text), { status: response.status });
}
