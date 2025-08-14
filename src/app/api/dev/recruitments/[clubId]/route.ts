import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import ky from 'ky';

// eslint-disable-next-line import/prefer-default-export
export async function POST(
  req: NextRequest,
  { params }: { params: { clubId: string } },
) {
  const session = await auth();
  const token = (session as any)?.accessToken;
  if (!token)
    return NextResponse.json(
      { message: '인증 권한이 없습니다.' },
      { status: 401 },
    );

  const body = await req.json();

  const out = await ky
    .post(`https://www.mokkoji.o-r.kr/api/dev/recruitments/${params.clubId}`, {
      json: body,
      headers: { Authorization: `Bearer ${token}` },
    })
    .json();

  return NextResponse.json(out, { status: 201 });
}
